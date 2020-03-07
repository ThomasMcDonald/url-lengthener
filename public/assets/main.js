
document.querySelector("#urlForm").addEventListener("submit", async (e) => {
    e.preventDefault(); 
    const potentionalUrl = document.getElementById('urltoLengthen').value;
    const isValidUrl = await validateUrl(potentionalUrl);
    if(!isValidUrl){
        console.error('Please check your link;')
        showErrorMessage();
        return;
    }
    const response = await fetch('/shorten', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: potentionalUrl})
    });
    const lengthenedUrl = await response.json();
    document.getElementById('urlList').insertAdjacentHTML('beforeend', listComponent(lengthenedUrl));
});


const listComponent = ({lengthenedUrl}) => {
    return `<li class='urlContainer'>
        <span class='longUrl'>${lengthenedUrl}</span>
        <span style='float:right'><button class='btn copyBtn' onClick='copyLink(event)'>Copy</button></span>
    </li>`
};

const showErrorMessage = () => {
    // error message already displayed
    // set display none and opactiy to 100 before we show the error so it technicall is reset after the last message
    
    document.getElementById('urlError').style.display = 'block';
    setTimeout(() => {
        document.getElementById('urlError').style.display = 'none';
    }, 4000);
    
}


const validateUrl = async (url) => {
    try{
        // if url is not valid it will Raise a TypeError exception
        const validatedUrl = new URL(url);
    
        return true;
    }catch(err){
        console.log(err);
        // if it errors out we can assume the url is not valid
        return false;
    }
};


const copyLink = async (e) => {
    
    e.target.innerText = 'Copied!';
    e.target.classList.add('copiedDataBtn');

    setTimeout(() => {
        e.target.innerText = 'Copy';
        e.target.classList.remove('copiedDataBtn');
    }, 2000);
    
    // fix this mess
    const url = e.target.parentNode.previousSibling.previousSibling.innerText;
    await navigator.clipboard.writeText(url);

    console.log(clipboardText);
};
