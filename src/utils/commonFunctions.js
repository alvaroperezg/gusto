export function getItems(planning){
    return { purchased: planning.groceryList.filter(item => item.purchased === true).length,
            total:planning.groceryList.length}
}