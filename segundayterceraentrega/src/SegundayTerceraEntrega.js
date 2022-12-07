const fs = require('fs')

class ProductManager {
    constructor(fileName){
        this.fileName = fileName
        this.format = 'utf-8'
    }

    

    generateID = async () => {
        const data = await this.getProduct()
        const count = data.length

        if (count == 0) return 1;

        const lastProduct = data[count - 1]
        const lastID = lastProduct.id
        const nextID = lastID + 1

        return nextID
    }


    addProduct = async (title, description, price, thumbnail, stock, code) => {
        const id = await this.generateID()

        return this.getProduct()
            .then(products => {
                products.push({id, title, description, price, thumbnail, stock, code})
                return products
            })
            .then(productsNew => fs.promises.writeFile(this.fileName, JSON.stringify(productsNew)))
}

    getProductById = async (id) => {
        const data = await this.getProduct()
        const productFound = data.find(product => product.id === id)
        return productFound || console.log(`ERROR: EL PRODUCTO CON EL ID "${id}" NO EXISTE.`);
    }

    getProduct = async () => {
        const product = fs.promises.readFile(this.fileName, this.format)
        return product
            .then(content => JSON.parse(content))
            .catch(e => {if(e) return []})
    }

    deleteProduct = async (id) => {
        const data = await this.getProduct()
        const toBeDeleted = data.find(product => product.id === id)

        if(toBeDeleted){
            const index = data.indexOf(toBeDeleted)
            data.splice(index, 1);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data))
            console.log(`\nPRODUCTO ELIMINADO: ID "${id}".`);
        } else {
            console.log(`\n\nERROR AL ELIMINAR PRODUCTO: EL PRODUCTO CON EL ID "${id}" NO SE ENCUENTRA EN LA LISTA.`);
        }
    }

    updateProduct = async (id, field, newValue) => {
        const data = await this.getProduct()
        const toBeUpdated = data.find(product => product.id === id)

        toBeUpdated[field] = newValue;
        
        await fs.promises.writeFile(this.fileName, JSON.stringify(data))
    }
}



async function run(){
    const manager = new ProductManager('./products.json')
    await manager.addProduct("Producto numero 1", "Esta es la descripcion del producto 1", 100, "FotoProduct1.jpg", 10, 1)
    await manager.addProduct("Producto numero 2", "Esta es la descripcion del producto 2", 200, "FotoProduct2.jpg", 11, 12)
    await manager.addProduct("Producto numero 3", "Esta es la descripcion del producto 3", 300, "FotoProduct3.jpg", 12, 123)
    await manager.addProduct("Producto numero 4", "Esta es la descripcion del producto 4", 400, "FotoProduct4.jpg", 13, 1234)
    await manager.addProduct("Producto numero 5", "Esta es la descripcion del producto 5", 500, "FotoProduct5.jpg", 14, 12345)
  
    await manager.deleteProduct(4);

    await manager.updateProduct(5, "title", "Este es el producto 5 actualizado")
    await manager.updateProduct(5, "stock", 15)

    
    console.log(await manager.getProduct());
    
    console.log(await manager.getProductById(2));
   
    console.log(await manager.getProductById(6));
}

run()