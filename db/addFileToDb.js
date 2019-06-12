
const addFileToDb = async (firestore, websiteId, type, filename, timestamp, url, title) => {
  const websiteRef = firestore.collection('websites').doc(websiteId);
  switch (type) {
    case 'template':
      console.log('addFileToDb: template');
      return websiteRef.collection('files').add({
        type: type,
        filename: filename,
        createdAt: timestamp,
      });

    case 'page':
      console.log('addFileToDb: page 1');  
      return websiteRef.collection('files').add({
        type: type,
        filename: filename,
        createdAt: timestamp,
        url,
        keywords:'',
        title,
        description:'',
        meta:'',
        scripts:'',
        styles:'',
      });
  
    default:
        console.log('addFileToDb: default');
      return;
  }
};

module.exports = addFileToDb;