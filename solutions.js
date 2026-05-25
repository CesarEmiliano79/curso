export const rectPerimeter = (x, y) => 2*(x + y);
export const rectArea = (x,y) => x*y;
export const triArea = (x,y) => (x*y)/2
export const ringArea = (x,y) => Math.PI * (y ** 2 - x ** 2);
export const f2c = (f) => ((f-32)/9)*5
export const c2f = (c) => ((c*9)/5)+32

export const makeName = (str1,str2) => str2+', '+str1
export const ellide = (s,x) =>  s.substring(0,x)+"..."

export const longer = (str1,str2) => (
  str1.length < str2.length
  ? str2
  : str1.length > str2.length
  ? str1
  : str1
);
export const mid3 = (x,y,z) => (
    x + y + z - Math.min(x, y, z) - Math.max(x, y, z)
);
export const lastFirst = (name) => (
    name.last === undefined && name.first == undefined
    ? ''
    :name.last === undefined
    ? name.first
    : name.first === undefined
    ? name.last
    : name.last+', '+name.first
);

export const subArray = (arr, indices) =>
    indices.map(i => arr[i]);
export const over21 = (people) => people.filter((person)=> person.age >= 21);
export const product = (lst) =>
    lst.reduce((acc, n) => acc * n, 1);
export const getRepeats = (lst) => lst.filter(
    (i,x) => lst.indexOf(i) !== lst.lastIndexOf(i) 
            && lst.indexOf(i) === x
    );
export const aboveAverage = (lst) =>
    lst.length === 0
        ? []
        : lst.filter(
            exam =>
                exam.score >
                lst.reduce((sum, x) => sum + x.score, 0) / lst.length
        );

export const reverseNumber = (num) =>
    Number(String(num).split('').reverse().join(''));
export const isWordAnagram = (pal1,pal2) =>(
    pal1.split('').sort().join() ===
    pal2.split('').sort().join()
);
export const isPhraseAnagram = (fr1,fr2) => 
    fr1.toLowerCase().replaceAll(' ', '').split('').sort().join() ===
    fr2.toLowerCase().replaceAll(' ', '').split('').sort().join()
;
export const longestWords = (fr) => {
    const max = Math.max(
        ...fr.split(' ').map(pal => pal.length)
    );

    return fr != ['']
        ?fr
        .split(' ')
        .filter(pal => pal.length === max)
        : [];
};

export const moduleTitles = () =>
    [...document.querySelectorAll('.module-title')]
        .map(el => el.innerText.trim());
export const goPurple = () => {
    document.querySelectorAll('.exercise-name').forEach(el => {
        el.style.color = 'white';
        el.style.backgroundColor = 'purple';
    });
    return 'Go Purple!';
};
export const copycat = (n) => {
    const rows = document.querySelectorAll('#copycat .test-result');
    const row = rows[n - 1];
    const expectedText = row.querySelectorAll('td')[1].textContent.trim();
    return eval(expectedText);
};