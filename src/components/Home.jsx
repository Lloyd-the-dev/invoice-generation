import React from 'react'
import { useState } from 'react'

const Home = () => {
    const [items, setItems] = useState([{ itemName: '', itemDescription: '', quantity: 1, price: 1.00 }]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    }

    const handleDeleteItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    }
    const handleAddItem = () => {
        setItems([...items, { itemName: '', itemDescription: '', quantity: 1, price: 1.00 }]);
    }

  return (
    <div className='flex m-16 justify-around items-start'>
        <div className="bg-white rounded-xl w-3/5  p-4 -ml-80">
            {/*Upper part of left hand side form*/}
           
            <div>
                <h3>Current Date: <span className='ml-4'>{new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</span></h3>
                <div className='flex items-center justify-between w-64 mt-2'>
                    <h3>Due Date: </h3>
                    <input type='date' className='bg-ashy p-2 rounded-md' required></input>
                </div>
                <hr className='mt-16'/>
            </div>
            {/* Middle Side*/}
            <div className='m-8 flex justify-between'>
                {/* Bill Sender */}
                <form className='flex flex-col w-2/5'>
                    <h2 className='font-bold mb-2'>Bill from:</h2>
                    <input required type="text" placeholder='who is this invoice from?' className='bg-ashy p-2 rounded-sm mb-2'/>
                    <input required type="email" placeholder='Email address' className='bg-ashy p-2 rounded-sm mb-2'/>
                    <input required type="text" placeholder='Billing address' className='bg-ashy p-2 rounded-sm mb-2'/>
                </form>
                {/* Bill Recepient */}
                <form className='flex flex-col w-2/5'>
                    <h2 className='font-bold mb-2'>Bill to:</h2>
                    <input required type="text" placeholder='who is this invoice to?' className='bg-ashy p-2 rounded-sm mb-2'/>
                    <input required type="email" placeholder='Email address' className='bg-ashy p-2 rounded-sm mb-2'/>
                    <input required type="text" placeholder='Billing address' className='bg-ashy p-2 rounded-sm mb-2'/>
                </form>
            </div>

            {/* Bottom Side */}
            <div>
                <hr className='mb-4 mt-16'/>
                {/* Item heading */}
                <div className='flex justify-between'>
                    <h1 className='font-bold'>ITEM</h1>
                    <div className='flex justify-between w-1/2'>
                        <h1 className='font-bold'>QTY</h1>
                        <h1 className='font-bold'>PRICE(₦)</h1>
                        <h1 className='font-bold'>ACTION</h1>
                    </div>
                </div>
                <hr className='mt-4'/>
                {items.map((item, index) => (
                <div key={index} className='flex justify-between items-center'>
                    <div className='flex flex-col items-center mt-2'>
                        <input
                            type="text"
                            placeholder='item name'
                            className=' bg-ashy p-2 rounded-lg mb-2 w-80'
                            value={item.itemName}
                            onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='item description'
                            className='bg-ashy p-2 rounded-lg mb-2 w-80'
                            value={item.itemDescription}
                            onChange={(e) => handleItemChange(index, 'itemDescription', e.target.value)}
                        />
                    </div>
                    <div className='flex justify-between w-1/2 -mt-8'>
                        {/* Quantity */}
                        <input
                            type="number"
                            placeholder='1'
                            className='w-16 p-2 rounded-sm bg-ashy'
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                        />
                        {/* Price */}
                        <input
                            type="number"
                            placeholder="1.00"
                            className='w-32 p-2 rounded-sm bg-ashy'
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                        />
                        {/* Delete Icon */}
                        <i
                            className='bx bx-trash text-white bg-red-600 p-4 cursor-pointer rounded-lg'
                            onClick={() => handleDeleteItem(index)}
                        ></i>
                    </div>
                </div>
            ))}
                <hr className='mt-4'/>
                <button className='rounded-lg bg-darkGray p-3 font-bold text-white mt-4' onClick={handleAddItem}>Add Item</button>
                <div className='text-right my-8 mx-32 w-4/5'>
                    <h4 className='font-bold mb-2'>Subtotal: <span className='ml-32 font-normal'></span></h4>
                    <h4 className='font-bold mb-2'>Discount: <span className='ml-32 font-normal'></span></h4>
                    <h4 className='font-bold mb-2'>Tax: <span className='ml-32 font-normal'></span></h4>
                    <hr className='-mr-16 w-1/2'/>
                    <h4 className='font-bold'>Total: <span className='ml-32 font-normal'></span></h4>
                </div>
            </div>
        </div>
        <div className="w-1/4 fixed right-0 mr-16">
            <button className='bg-darkGray p-4 text-white rounded-lg font-bold w-full' type='submit'>Review Invoice</button>
            <hr className='m-4 w-full -ml-0'/>
            <form>
                <p>Tax rate(%):</p>
                <input type="number" className='p-2 rounded-lg w-full my-2'/>
                <p>Discount Rate(%):</p>
                <input type="number" className='p-2 rounded-lg w-full my-2'/>
            </form>
        </div>
    </div>
  )
}

export default Home