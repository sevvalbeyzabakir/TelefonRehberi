import React from 'react';
import axios from 'axios';

class EditUser extends React.Component {

    state = {
        name: "",
        tel: "",
    }

    async componentDidMount() {

        const id = this.props.match.params.id;
  
        const response = await axios.get(`http://localhost:3002/users/${id}`);

        const user = response.data;

        this.setState({
            name: user.name,
            tel: user.tel,
        })

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        const { name, tel } = this.state;
        const id = this.props.match.params.id;

        const updatedUser = {
            name,
            tel,
        }

        this.props.onEditUser(id, updatedUser);
        this.props.history.push('/'); //edit olduktan sonra ana sayfaya dönmesi
    }

    render() {

        return  (
            <div className="container">
            <form className="mt-5" onSubmit={this.handleFormSubmit}>
            <input className="form-control" id="disabledInput" type="text" placeholder="Kişi bilgilerini güncelleyin" disabled/>
                <div className="form-row">
                    <div className="form-group col-md-12 mt-4">
                        <label htmlFor="inputName">İsim</label>
                        <input  type="text" 
                                className="form-control " 
                                name="name"
                                value={this.state.name}
                                onChange={this.onInputChange}
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
                            value={this.state.tel}
                            onChange={this.onInputChange}
                            //11 hane sonrasında yazmamak için 
                            onInput = {(e) =>{
                                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                            }}
                        />
                    </div>
                </div>
                <input type="submit" className="btn btn-info btn-block" value="Kişiyi Bilgilerini Güncelle"
                />
            </form>
        </div>
        )

    }
}


export default EditUser;