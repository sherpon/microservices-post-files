
const addFileToDb = async (firestore, websiteId, type, filename, timestamp, url, title) => {
  const websiteRef = firestore.collection('websites').doc(websiteId);
  switch (type) {
    case 'template':
      return websiteRef.collection('files').doc(filename).add({
        type: type,
        createdAt: timestamp,
      });

    case 'page':
      return websiteRef.collection('files').doc(filename).add({
        type: type,
        createdAt: timestamp,
        url,
        title,
        keywords:'',
        description:'',
        themeColor: '',
        meta:'',
        script:'',
        style:'',
      });
  
    default:
      return;
  }
};

module.exports = addFileToDb;