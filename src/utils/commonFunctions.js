export function getItems(planning){
    console.log("------------------------------------------------------")
    console.log(planning.groceryList.filter(item => item.purchased === false).length)
    console.log("------------------------------------------------------")
    return planning.groceryList.filter(item => item.purchased === false).length;
}