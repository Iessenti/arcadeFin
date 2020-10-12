import React, {useState} from 'react'

export class ProductForm extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			price: '',
			sex: '',
			mainPhoto: '',
			secPhoto: '',
			thiPhoto: '',
			description: '',
			category: '',
			color: '',
			sizes:''
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.myChangeHandler = this.myChangeHandler.bind(this)
	}
	
	handleSubmit(event) {
		event.preventDefault()
		let data = {
			id: this.state.id,
			title: this.state.title,
			price: this.state.price,
			sex: this.state.sex,
			mainPhoto: this.state.mainPhoto,
			secPhoto: this.state.secPhoto,
			thiPhoto: this.state.thiPhoto,
			description: this.state.description,
			category: this.state.category,
			sizes: this.state.sizes,
			color: this.state.color,
			brand: this.state.brand
		}

		fetch('/addNewProduct', {method:'POST', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(data)})

		this.setState({
			id: '',			
			title: '',
			price: '',
			sex: '',
			mainPhoto: '',
			secPhoto: '',
			thiPhoto: '',
			description: '',
			color: '',
			sizes: '',
			category: '',
			brand: ''
		})
	}
	
	myChangeHandler(event) {
	    let nam = event.target.name;
	    let val = event.target.value;
	    this.setState({[nam]: val});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div class="rows">
					<label>ID товара</label><br />
					<input type='text' name="title" onChange={this.myChangeHandler} value={this.state.id}/>
				</div>
				<div class="rows">
					<label>Наименование товара</label><br />
					<input type='text' name="title" onChange={this.myChangeHandler} value={this.state.title}/>
				</div>
				<div class="rows">
					<label>Цена</label><br />
					<input type='text' name="price" onChange={this.myChangeHandler} value={this.state.price}/>
				</div>
				<div class="rows">
					<label>Цвет</label><br />
					<input type='text' name="price" onChange={this.myChangeHandler} value={this.state.color}/>
				</div>
				<div class="rows">
					<label>Размер</label><br />
					<input type='text' name="price" onChange={this.myChangeHandler} value={this.state.color}/>
				</div>
				<div class="rows">
					<label>Категория</label><br />
					<input type='text' name="price" onChange={this.myChangeHandler} value={this.state.category}/>
				</div>
				<div class="rows">
					<label>Бренд</label><br />
					<input type='text' name="thiPhoto" onChange={this.myChangeHandler} value={this.state.brand}/>
				</div>
				<div class="rows">
					<label>Пол</label><br /> 
					<input type='text' name="sex" onChange={this.myChangeHandler} value={this.state.sex}/>
				</div>
				<div class="rows">
					<label>Ссылка на заглавное фото</label><br />
					<input type='text' name="mainPhoto" onChange={this.myChangeHandler} value={this.state.mainPhoto}/>
				</div>
				<div class="rows">
					<label>Фото №2</label><br />
					<input type='text' name="secPhoto" onChange={this.myChangeHandler} value={this.state.secPhoto}/>
				</div>
				<div class="rows">
					<label>Фото №3</label><br />
					<input type='text' name="thiPhoto" onChange={this.myChangeHandler} value={this.state.thiPhoto}/>
				</div>
				<div class="rows">
					<label>Описание</label><br />
					<textarea class="highInput" name="description" onChange={this.myChangeHandler} value={this.state.description}> </textarea>
				</div>
				<input type="submit" value="Добавить" class="button" />
			</form>
		)
	}
}
