import React from 'react';
import { Link } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';

const UserList = (props) => {

    //görünen string uzunlukları eşit olsun diye yazdım
    const truncateName = (string, maxLength) => {
        if (!string) return null;
        if (string.length <= maxLength ) return string;
        return `${string.substring(0, maxLength)} ...`;
    }

        return (
            <div className="row">
                <button className="btn btn-dark btn-block mb-2 col-12">Kayıtlı Telefonlar Listesi</button>
                            
                {props.users.map((user, i) => (
                    
                    <div className="col-12 mb-1" key={i}>  
                        <div className="card mb-4 shadow-sm">
                            
                            <div className="card-body d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">{truncateName(user.name, 50)}</h5>
                                    <p className="card-text"> {user.tel}</p>
                                </div>
                                
                                <div className="d-flex  float-right h-50 mt-2">
                                <Link type="button"
                                    className="btn btn-md btn-outline-primary  mr-2"
                                    to={`edit/${user.id}`}
                                    ><i className="fas fa-user-edit"></i> </Link>

                                    {/* silmek istediğinize emin misiniz pop up ı */}
                                    <button type="button" onClick={(event) => { if (window.confirm('Silmek istediğinize emin misiniz?')) props.deleteUserProp(user) } } className="btn btn-md btn-outline-danger">
                                    <i className="far fa-trash-alt"></i>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
}

export default UserList;