class FetchHelper{
	static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
  static fetchDataSuccess(data){
    console.log('FetchHelper pushDataSuccess:', data);
    return data;
  }	
	static fetchDataFailed(error){
    console.error('FetchHelper fetch data failed', error);
    return error;
  }
  static parseJSON(response) {
    // console.debug("FetchHelper parseJSON response:", response);
    let jsonObj = response.json();
    // console.debug("FetchHelper parseJSON jsonObj:", jsonObj);
    return jsonObj;
  }
}
export default FetchHelper;

function  getWord(q) {
    fetch('http://localhost:5001/word/' + q, {
      method: 'GET',
      mode: "cors"
    }).then(FetchHelper.checkStatus)
      .then(FetchHelper.parseJSON)
      .then((e) => {
        this.setState({
          consult: JSON.stringify(e)
        })
      });
  }