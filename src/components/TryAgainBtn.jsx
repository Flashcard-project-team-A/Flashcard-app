export default function TryAgainBtn(){

    function handleClick(){
        console.log("Oh oh, wrong!");
    }


    return (

        <button id="TryAgainBtn" onClick={handleClick}>
            No
        </button>

    );
}