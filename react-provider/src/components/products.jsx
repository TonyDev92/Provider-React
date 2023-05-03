import React, { useContext, useState } from 'react'
import { ProductsContext } from '../shared/product.context'
import { useForm } from 'react-hook-form';
import pen from '../assets/pen29.png'
import del from '../assets/delete30.png'
import add from '../assets/add30.png'
const Products = () => {
    let [modal, setModal] = useState(false)
    const [products, setProducts] = useState([]);
    const { register, watch, handleSubmit } = useForm();
    const [prodComment, setProdComment] = useState({ coment: "" });
    console.log(prodComment);


    console.log(products);
    const addNew = () => {
        const name = prompt('Enter the name');
        const amnt = prompt('Enter the amount'); // recogemos el valor del prompt

        const product = {
            nombre: name,
            cantidad: amnt,
            coments: []
        }

        if (product.nombre && product.cantidad) { //Controlamos que no recojemos campos vacios
            setProducts([...products, product]) //Los almacenamos
        } else {
            alert('You must add the two fields')
        }
    }
    const editProd = (e, index) => { //Esta función edita el producto
        // console.log(e);
        // console.log(index);
        const newName = prompt('Enter new name')
        const amnt = prompt('Enter the amount')
        if (newName && amnt) {
            e.nombre = newName;
            e.cantidad = amnt;
            const newList = [...products];
            newList.splice(index, 1, e);
            // console.log(newList);
            setProducts(newList);
        } else {
            alert('You must to add the two fields')
        }
    }
    const deleteProduct = (index) => { //Esta función asegura que se quiera eliminar el producto y lo elimina
        const shouldTodelete = window.confirm('Are you shure?');

        if (shouldTodelete) {
            const newList = [...products];
            newList.splice(index, 1);
            setProducts(newList)
        }
    }
    const modalPop = () => {
        if (!modal) {
            setModal(true)
        } else {
            setModal(false)
        }

    }
    const sendComments = ($event, element) => {
        // $event.preventDefault();
        // element.coments.push(prodComment);
        // element.coments = prodComment;
        $event.preventDefault();
        const newComment = prodComment['coments'];
        element.coments = [...element.coments, newComment];
        setProdComment({ coments: '' }); // limpiar el estado de comentarios
    }
    const addCmm = (e) => {
        setProdComment({ ...prodComment, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container'>
                <h1>Products</h1>
                <div className='galery'>

                    {products.map((e, index) => <>
                        <div className='contain' key={index}>
                            <div className='card'>
                                <div className='card__in'>
                                    <img className='card__in--active' src={del} onClick={() => deleteProduct(index)} alt='x'></img>
                                    <img className='card__in--active' src={pen} onClick={() => editProd(e, index)} alt='edit'></img>
                                </div>
                                <h3>{e.nombre}</h3>
                                <p>cantidad : {e.cantidad}</p>


                            </div>
                            <button className='comentar' onClick={() => modalPop()}>Comment</button>
                        </div>
                    </>)}
                </div>
                {modal === true ? <div className='modal'>
                <img className="x"src={del} alt='x' onClick={() => modalPop()}></img>
                    {products.map((e, index) => <div key={index}>
                        <h2>Comments</h2>
                        
                        <form className='modal__content'> 
                            <label htmlFor='coment'>COMMENT</label>
                            <textarea name="coments" placeholder='write a short comment about the product' onChange={(e) => addCmm(e)}></textarea>
                            <button onClick={(event) => sendComments(event, e)}>Add</button>
                        </form>
                        <div>{e.coments.map((elem , index) => <p key={index}>{elem}</p>)}</div>
                    </div>)}
                </div> : null}
                <div className='add'>
                    <img src={add} alt='add' className='addimg' onClick={() => addNew()}></img>
                </div>
            </div>
        </>
    )
}

export default Products
