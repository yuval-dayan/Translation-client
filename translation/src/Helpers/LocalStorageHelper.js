export const getCurrentContainerFromLS = () =>{
    return JSON.parse(localStorage.getItem('currentContainer'))
  }
  export const getApplicationStatusFromLS = ()=>{
    return JSON.parse(localStorage.getItem('applicationsStatus'))
  }

 export const setApplicationsStatus = (items) =>{
    localStorage.setItem('applicationsStatus', JSON.stringify(items))
  
  }
  export const setCurrentContainerToLS = (containerName) =>{
        localStorage.setItem('currentContainer', JSON.stringify(containerName))
    }