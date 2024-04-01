export default function createPlace(size){
    const data=[];
    initializate()
    function initializate(){
        for(let x=0; x< size; x++ ){
            const column=[]
            for(let y=0; y< size; y++ ){
                const tile={x,y}
                column.push(tile)
            }

            data.push(column)
        }
    }
    return{
        size, 
        data
    }
}