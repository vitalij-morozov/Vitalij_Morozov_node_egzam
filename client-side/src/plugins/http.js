const http = {
  post: async (url, data) => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };

      const res = await fetch(url, options);
      const dataInJs = await res.json();
      console.log('post data ===', dataInJs);
      return dataInJs;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default http;
