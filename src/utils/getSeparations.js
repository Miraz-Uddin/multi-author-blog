export default function getSeparations(arr) {
  const comments = [];

  // level 1
  for (let i of arr) {
    if (i.attributes.parentId === null) {
      const children = [];
      comments.push({ ...i, children });
    }
  }
  // level 2
  for (let i of arr) {
    const pId = i.attributes.parentId;
    if (pId !== null) {
      for (let p of comments) {
        if (p.id === parseInt(pId)) {
          const children = [];
          p.children.push({ ...i, children });
        }
      }
    }
  }
  // level 3
  for (let i of arr) {
    const pId = i.attributes.parentId;
    if (pId !== null) {
      for (let p of comments) {
        if (p.id !== parseInt(pId)) {
          for (let j of p.children) {
            if (j.id === parseInt(pId)) {
              const children = [];
              j.children.push({ ...i, children });
            }
          }
        }
      }
    }
  }
  return comments;
}
