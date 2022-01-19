const cartContent = [];

export const getCart = (req, res) => {
    res.send(cartContent);
}

export const addToCart = (req, res) => {
    const itemToAdd = req.body;
    if(cartContent.findIndex(movie => movie.id === itemToAdd.id) < 0){
        cartContent.push(itemToAdd);
        res.send({
            status: 'ok',
            cartContent
        } 
            );
    } else {
        res.send({    
            status: 'not ok',
            cartContent
        }
        )
    }
}

export const removeFromCart = (req, res) => {
    const id = String(req.query.id);
    const indexToRemove = cartContent.findIndex(movie => movie.id === id);

    if(indexToRemove >= 0){
        cartContent.splice(indexToRemove, 1);
        res.send({
            status: 'ok',
            cartContent
        })
    }
    else {
        res.send({
            status: 'not ok',
            cartContent
        })
    }    
}