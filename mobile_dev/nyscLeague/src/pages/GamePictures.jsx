import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { usePictures, addPicture, useGame } from '../utilities/firebase.jsx'
import { uploadImageToCloudinary } from '../utilities/cloudinary.js'

export default function GamePictures() {
  const { id: gameId } = useParams()
  const { user } = useAuth()
  const [game] = useGame(gameId)
  const [pictures, loading, error] = usePictures(gameId)

  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null
    setFile(selected)
    setUploadError(null)
    console.log('Selected file:', selected?.name)
  }

  const handlePost = async () => {
    if (!file || !user) return

    setIsUploading(true)
    setUploadError(null)

    try {
      const url = await uploadImageToCloudinary(file)
      await addPicture(gameId, {
        url,
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
      })
      setFile(null)
    } catch (err) {
      const message = err instanceof Error && err.message.startsWith('Invalid picture data')
        ? err.message.replace('Invalid picture data: ', '')
        : 'Error uploading picture. Please try again.'
      setUploadError(message)
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  return (
    <div>
      <Link to="/schedule" className="btn btn-outline-secondary mb-3">
        ← Back to Schedule
      </Link>

      <span className="badge">Game Photos</span>
      <h1 className="page-title" style={{ marginTop: 8 }}>
        {game ? `${game.team1?.name} vs ${game.team2?.name}` : 'Game Photos'}
      </h1>

      {/* Formulario para subir foto: solo si hay sesión */}
      {user ? (
        <div className="feed-form-container" style={{ marginBottom: 24 }}>
          <div className="form-field">
            <label>Add a photo</label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>

          {uploadError && (
            <div className="alert alert-danger" role="alert" style={{ marginTop: 12 }}>
              {uploadError}
            </div>
          )}

          <button
            className="btn btn-primary"
            style={{ marginTop: 12 }}
            onClick={handlePost}
            disabled={!file || isUploading}
          >
            {isUploading ? 'Posting...' : 'Post Photo'}
          </button>
        </div>
      ) : (
        <div className="login-prompt" style={{ marginBottom: 24 }}>
          <p>Sign in to add photos</p>
        </div>
      )}

      {/* Galería de fotos */}
      {loading ? (
        <p>Loading photos...</p>
      ) : error ? (
        <p className="text-danger">Error loading photos</p>
      ) : pictures.length > 0 ? (
        <div className="photo-gallery">
          {pictures.map((pic) => (
            <div key={pic.id} className="photo-card">
              <img src={pic.url} alt={`Photo by ${pic.authorName}`} className="photo-image" />
              <div className="photo-meta">
                <span className="photo-author">{pic.authorName}</span>
                <span className="photo-time">{formatDate(pic.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📷</div>
          <p>No photos yet</p>
          <span>Be the first to share a photo from this game!</span>
        </div>
      )}
    </div>
  )
}