import React from 'react';
import serialize from 'form-serialize';

class AddUser extends React.Component {

    handleFormSubmit = (e) => {
        e.preventDefault(); //sayfanın yenilenmesini kapadım.
        const newUser = serialize(e.target, { hash: true });
        this.props.onAddUser(newUser);
    }

    //input alanları boş olmasın diye inputlar boş olduğunda kaydet butonu pasif oluyor
    //bunun için state ve setState tanımladım.
     state ={
        name:"",
        tel:""
    }
     
    handleChangeName = (e)=>{
        this.setState({
          name:e.target.value
        })
    }

    handleChangeTel = (e)=>{
        this.setState({
          tel:e.target.value
        })
    } 
    
    render() {
        
        return  (
            <div className="container">
            <form className="mt-5" onSubmit={this.handleFormSubmit}>
                <input className="form-control" id="disabledInput" type="text" placeholder="Kaydetmek için formu doldurun. Tüm alanlar dolu ise kaydet butonu aktif olacaktır." disabled/>
                    <div className="form-row">
                        <div className="form-group col-md-12 mt-4" >
                            <label htmlFor="inputName">İsim</label>
                            <input  type="text" 
                                    className="form-control" 
                                    name="name" 
                                    onChange={this.handleChangeName}
                                    value={this.state.name}  
                                    
                                />   
                        </div>
                    </div>
                
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="telTextarea">Telefon Numarası</label>
                            <input  
                                type="number" 
                                className="form-control" 
                                name="tel"
                                onChange={this.handleChangeTel}
                                value={this.state.tel}
                                //11 hane sonrasında yazmamak için 
                                onInput = {(e) =>{
                                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                                  }}
                                  
                                  
                                />
                        </div>

                    </div>
                <input type="submit" className="btn btn-success btn-block" value="Kişiyi kaydet"
                disabled={(this.state.name.length<1), (this.state.tel.length<10) }
                 />
                
            </form>
        </div>
        )

    }
}


export default AddUser;