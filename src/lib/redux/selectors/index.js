
const calculateTotal = ($0, $1) => $0 +$1
const selectItems= state=>state.cart.items

//calculer les prix de chaque produit 
export const selectCartTotal= state=>{
    return selectItems(state)
    .map((item)=>item.price * item.quantity)
.reduce(calculateTotal, 0)}

export default calculateTotal;
