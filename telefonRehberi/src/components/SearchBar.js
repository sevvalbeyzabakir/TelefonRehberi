import React from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {

    //form elemanının varsayılan davranışı sayfanın yenilenmesi.
    //bunu önlemek için bu fonk oluşturdum
    handleFormSubmit = (event) => {
        event.preventDefault(); //eventin varsayılan davranışını durdur
    }

    render() {

        return  (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-row my-3 d-flex justify-content-between"> 

                    <div className="w-75">
                            <input 
                                onChange={this.props.searchUserProp} 
                                type="text" className="form-control" 
                                placeholder="Kişi ara" 
                            />
                    </div>

                    <div className="">
                            <Link
                                to="/add"
                                type="button" 
                                className="btn btn-md btn-primary mb-2"
                                style={{float:'left'}}>Yeni Kişi Ekle <i className="fas fa-user-plus ml-1"></i>
                            </Link>
                    </div>
                     
                </div>
               
            </form>
        )

    }
}


export default SearchBar;