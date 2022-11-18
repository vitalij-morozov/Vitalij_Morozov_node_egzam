const http = {
  get: async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log('get data ===', data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },

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
