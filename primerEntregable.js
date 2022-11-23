class ProductManager {

    constructor(){
        this.products = []
    }

    getNetxtID = () => {
        const count = this.products.length
        return (count > 0) ? this.products[count -1].id + 1 : 1
    }

    validarCode = (code) =>{
        const producto = this.products.find(producto => producto.code === code)
        if(producto == undefined){
            return true;
        } else if(producto != undefined){ 
            console.log("Error: El codigo " +  code + " no puede repetirse");
            return false;
        }
    }

    validarCampos = (title, description, price, thumbnail, code, stock) =>{
        if((title== undefined || title=="") || (description == undefined || description == "") || (price == undefined ||price == "") || (thumbnail== undefined || thumbnail== "") || (code== undefined || code== "") || (stock == undefined || stock == "")){
            console.log("Todos los campos deben ser completados")
            return false;
        }else{
            return true;
        }
    }


    addProduct = (title, description, price, thumbnail, code, stock) => {

        if(this.validarCode(code)&& this.validarCampos(title, description, price, thumbnail, code, stock)){

            
            const product ={
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id:this.getNetxtID()
            }

            this.products.push(product)}


    }

    getProductByID = (id) => {
        const productFound = this.products.find(product => product.id === id)
        return productFound || console.log("Error: Not found")
    }
    

    getProducts = () => {return this.products}


}

const manager = new ProductManager ()

manager.addProduct("Producto numero 1", "Esta es la descripcion del producto 1", 100, "FotoProduct1.jpg", 123, 1)
manager.addProduct("Producto numero 2", "Esta es la descripcion del producto 2", 200, "FotoProduct2.jpg", 1234, 2)

// console.log(manager.products);
console.log(manager.getProducts())
console.log(manager.getProductByID(3));