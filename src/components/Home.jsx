import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState, useEffect } from 'react'

const Home = () => {
    const [items, setItems] = useState([{ itemName: '', itemDescription: '', quantity: 1, price: 1.00 }]);
    const[subtotal, setSubtotal] = useState(0)
    const[discountRate, setDiscountRate] = useState(0)
    const[discount, setDiscount] = useState(null)
    const[taxRate, setTaxRate] = useState(0)
    const[tax, setTax] = useState(null)
    const[total, setTotal] = useState(null)
    const [dueDate, setDueDate] = useState('')
    const [billFrom, setBillFrom] = useState('')
    const [billTo, setBillTo] = useState('')
    const [billFromEmail, setBillFromEmail] = useState('')
    const [billToEmail, setBillToEmail] = useState('')
    const [billFromAddress, setBillFromAddress] = useState('')
    const [billToAddress, setBillToAddress] = useState('')
    const [showModal, setShowModal] = useState(false)
    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
        calculateSubtotal(newItems)
       
    }
    const calculateSubtotal = (items) => {
        let total = 0;
        items.forEach(item => {
            total += item.price * item.quantity
        })
        setSubtotal(total)
    }
   

    const handleDeleteItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        calculateSubtotal(newItems)
    }
    const handleAddItem = () => {
        setItems([...items, { itemName: '', itemDescription: '', quantity: 1, price: 1.00 }]);
    }
   
    const handleDiscountRate = (e) => {
        const rate = parseFloat(e.target.value)
        setDiscountRate(rate)
        calculateDiscount(items,rate)
    }
    const calculateDiscount = (items, rate = discountRate) =>{
        if(!rate){
            setDiscount(0)

            return
        }
        const discountAmount = (rate / 100) * subtotal;
        setDiscount(discountAmount)
    }
    const handleTaxRate = (e) => {
        const rate = parseFloat(e.target.value)
        setTaxRate(rate)
        calculateTax(items, rate)
    }
    const calculateTax = (items, rate = taxRate) => {
        if(!rate){
            setTax(0)
            return
        }
        const taxAmount = (rate/100) * subtotal
        setTax(taxAmount)
    }
        const handleDownloadPDF = () => {
        const modal = document.getElementById('modal-content');
        const closeButtonHeight = 40; 
        const downloadButtonHeight = 40; 
      
        html2canvas(modal).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgWidth = 210; 
          const imgHeight = (canvas.height - closeButtonHeight - downloadButtonHeight) * imgWidth / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('modal.pdf');
        });
      };
      
      

    useEffect(() => {
        const discountAmount = (discountRate / 100) * subtotal;
        setDiscount(discountAmount || 0);
    }, [discountRate, subtotal]);

    useEffect(() => {
        const taxAmount = (taxRate / 100) * subtotal;
        setTax(taxAmount || 0);
    }, [taxRate, subtotal]);
    useEffect(() => {
        const total = subtotal - (discount || 0) + (tax || 0);
        setTotal(total);
    }, [discount, tax, subtotal]);


    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    }

    const handleSubmit = () => {
        // Check if all inputs are filled
        const allInputsFilled = items.every(item => item.itemName && item.itemDescription && item.quantity && item.price)
        && dueDate &&  billFrom && billTo && billFromEmail && billToEmail && billFromAddress && billToAddress
        if (allInputsFilled) {
            // Open modal
            setShowModal(true)
            
        } else {
            alert('Please fill in all required fields');
        }
    }


  return (
    <div className='sm:flex m-16 sm:justify-around sm:items-start w-full sm:w-4/5'>
        {showModal ? (
        <>
          <div
            id="modal-content"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-4/5 my-6 mx-auto max-w-3xl p-16">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-col items-center font-bold m-8">
                    <h1 className="text-3xl">INVOICLY</h1>
                    <p className="text-xl">Generate your invoices with ease and accuracy</p>
                </div>
                <div className="flex items-start justify-between m-4 p-5 border-b border-solid border-blueGray-200 rounded-t">
                    
                  <div className='flex justify-between w-full'>
                    <h1>{billFrom}</h1>
                    <div className='flex flex-col items-center'>
                        <h1>Amount Due:</h1>
                        <h1>{total}</h1>
                    </div>
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className='flex justify-between w-4/5 m-8 p-4'>
                    <div className='flex flex-col items-start'>
                        <h3 className='font-extrabold'>Billed From:</h3>
                        <p>{billFrom}</p>
                        <p>{billFromEmail}</p>
                        <p>{billFromAddress}</p>
                    </div>
                    <div className='flex flex-col items-start'>
                        <h3 className='font-extrabold'>Billed To:</h3>
                        <p>{billTo}</p>
                        <p>{billToEmail}</p>
                        <p>{billToAddress}</p>
                    </div>
                    <div className='flex flex-col items-start'>
                        <h1 className='font-extrabold'>Date of Issue:</h1>
                        <p>{dueDate}</p>
                    </div>
                </div>
                {/*body*/}
                
                <div className="relative p-6 flex-auto">
                    
                  <hr />
                  <div className='flex justify-between w-4/5 m-8 mb-0'> 
                    <div className='flex w-3/4 justify-between'>
                        <h1 className='font-extrabold'>QTY</h1>
                        <h1 className='w-4/5 font-extrabold'>Description</h1> {/* NB: this should be the item name plus the description*/}
                    </div>
                    <h1 className='font-extrabold'>Amount</h1>
                  </div>
                </div>
                {items.map((item, index) => (
                    <div key={index} className='flex justify-between w-4/5 mx-16'>
                        <div className='flex w-3/5 justify-between'>
                            <p>{item.quantity}</p>
                            <p>{item.itemName} - {item.itemDescription}</p>
                        </div>
                        <p className='mr-4'>{item.price * item.quantity}</p>
                    </div>
                ))}
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b mt-16">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="border-emerald-500 border text-black hover:bg-emerald-500 hover:text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDownloadPDF}
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
        <div className="bg-white rounded-xl sm:w-3/4  p-4 sm:-ml-80">
            {/*Upper part of left hand side form*/}
           
            <div>
                <h3>Current Date: <span className='ml-4'>{new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</span></h3>
                <div className='flex items-center justify-between w-64 mt-2'>
                    <h3>Due Date: </h3>
                    <input type='date' className='bg-ashy p-2 rounded-md' value={dueDate} onChange={handleDueDateChange} required></input>
                </div>
                <hr className='mt-16'/>
            </div>
            {/* Middle Side*/}
            <div className='m-8 flex justify-between'>
                {/* Bill Sender */}
                <form className='flex flex-col w-2/5'>
                    <h2 className='font-bold mb-2'>Bill from:</h2>
                    <input 
                        required 
                        type="text" 
                        placeholder='who is this invoice from?' 
                        className='bg-ashy p-2 rounded-sm mb-2' 
                        value={billFrom} onChange={(e) => setBillFrom(e.target.value)}
                    />
                    <input 
                        required 
                        type="email" 
                        placeholder='Email address' 
                        className='bg-ashy p-2 rounded-sm mb-2'
                        value={billFromEmail} onChange={(e) => setBillFromEmail(e.target.value)}
                    />
                    <input 
                        required 
                        type="text" 
                        placeholder='Billing address' 
                        className='bg-ashy p-2 rounded-sm mb-2'
                        value={billFromAddress} onChange={(e) => setBillFromAddress(e.target.value)}    
                    />
                </form>
                {/* Bill Recepient */}
                <form className='flex flex-col w-2/5'>
                    <h2 className='font-bold mb-2'>Bill to:</h2>
                    <input 
                        required 
                        type="text" 
                        placeholder='who is this invoice to?' 
                        className='bg-ashy p-2 rounded-sm mb-2'
                        value={billTo} onChange={(e) => setBillTo(e.target.value)}
                    />
                    <input 
                        required 
                        type="email" 
                        placeholder='Email address' 
                        className='bg-ashy p-2 rounded-sm mb-2'
                        value={billToEmail} onChange={(e) => setBillToEmail(e.target.value)}
                    />
                    <input 
                        required 
                        type="text" 
                        placeholder='Billing address' 
                        className='bg-ashy p-2 rounded-sm mb-2'
                        value={billToAddress} onChange={(e) => setBillToAddress(e.target.value)}    
                    />
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
                    <h4 className='font-bold mb-2'>Subtotal: <span className='ml-32 font-normal'>₦{subtotal}</span></h4>
                    <h4 className='font-bold mb-2'>Discount: <span className='ml-32 font-normal'>₦{discount !== null ? discount : 0}</span></h4>
                    <h4 className='font-bold mb-2'>Tax: <span className='ml-32 font-normal'>₦{tax !== null ? tax : 0}</span></h4>
                    <hr className='w-1/2 ml-80'/>
                    <h4 className='font-bold'>Total: <span className='ml-32 font-normal'>₦{total !== null ? total : 0}</span></h4>
                </div>
            </div>
        </div>
        <div className="w-1/4 fixed right-0 mr-16">
            <button className='bg-darkGray p-4 text-white rounded-lg font-bold w-full' onClick={handleSubmit}>Review Invoice</button>
            <hr className='m-4 w-full -ml-0'/>
            <form>
                <p>Tax rate(%):</p>
                <input type="number" className='p-2 rounded-lg w-full my-2' value={taxRate} onChange={handleTaxRate}/>
                <p>Discount Rate(%):</p>
                <input type="number" className='p-2 rounded-lg w-full my-2' value={discountRate} onChange={handleDiscountRate}/>
            </form>
        </div>
    </div>
  )
}

export default Home