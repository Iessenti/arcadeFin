import React from 'react'
import { useState } from 'react'


export const DataTable = () => {
	const [orders, setOrders] = useState(null)

	const setPerformed = async (num) => {
		let data = {id: num}
		console.log(data)
		const response = await fetch('/statusSetter', {method:'POST', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(data)})
		const result = await response.json();
		alert(result.message);
	}

	const getData = async () => {
			const response = await fetch('/orders', {method:"GET"})
			const data = await response.json()
			const body = data.map((elem, index) => {
				if (elem.status == "1") {
					return (
						<div key={index} className="row">
							<span className="order-id">{elem.num}</span>
							<span className="order-address">{elem.address}</span>
							<span className="order-name">{elem.item}</span>
							<span className="order-size">{elem.size}</span>
							<span className="order-phone">{elem.phone}</span>
							<button onClick={() => {setPerformed(elem.num)} }>Выполнен</button>
						</div>
					)
				}
			})
			setOrders(body)	
	}

	getData()

	return ( 
		<div>
		 	<div id="table">
		 		{orders}
		 	</div>	
		</div>
	)
}