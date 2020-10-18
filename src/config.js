const localConfig = {
    service: {    
    url: "http://localhost:5000/satya-sandesh-e89d2/us-central1/"   
  }
}
  
  const productionConfig={
    service: {
      url: "https://us-central1-satya-sandesh-e89d2.cloudfunctions.net/app"
    }
  }
  
  const environment = {
    development: localConfig,
    production: productionConfig,
  };
  let config = environment[process.env.REACT_APP_STAGE];
  
  export default config;
  