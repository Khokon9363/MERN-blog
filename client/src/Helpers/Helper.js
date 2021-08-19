class Helper{
    setTitle(title = 'Not found'){
        return document.title = `${process.env.REACT_APP_NAME} - ${title}`
    }

    setUserAndToken(user){
        localStorage.setItem('user', JSON.stringify(user))
        return this.getUserAndToken()
    }

    getUserAndToken(){
        return JSON.parse(localStorage.getItem('user')) ?? {}
    }
    
    removeUserAndToken(){
        localStorage.removeItem('user')
        return true
    }

    prepareServerFile(path){
        return path.replace('public', '')
    }

    Toaster(message, status = 'success', duration = 5000){
        let toaster = document.getElementById("toaster")
            toaster.textContent = message
            switch (status) {
                case 'success':
                    toaster.style.backgroundColor = 'greenyellow'
                    break;
                case 'danger':
                    toaster.style.backgroundColor = 'red'
                    break;
                case 'info':
                    toaster.style.backgroundColor = 'blue'
                    break;
            }
            toaster.classList.add('show')
            setTimeout(() => {
                toaster.classList.remove('show')
            }, duration)
    }
}

export default Helper = new Helper