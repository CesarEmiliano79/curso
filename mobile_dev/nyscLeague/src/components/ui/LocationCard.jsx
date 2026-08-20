export default function LocationCard({ name, address, mapSrc }) {
  return (
    <div className="location-card">
      <h3>{name}</h3>
      <p>{address}</p>
      {mapSrc && (
        <iframe
          src={mapSrc}
          title={name}
          loading="lazy"
          allowFullScreen
        />
      )}
    </div>
  )
}
