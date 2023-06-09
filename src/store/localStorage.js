const store = {
    setLocalStorage(item) {
      localStorage.setItem("item", JSON.stringify(item));
    },
    getLocalStorage() {
      return JSON.parse(localStorage.getItem("item"));
    },
  };
  
  export default store;
  