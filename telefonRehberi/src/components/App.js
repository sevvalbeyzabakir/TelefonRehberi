import React from 'react';
import UserList from './UserList';
import SearchBar from './SearchBar';
import AddUser from './AddUser';
import EditUser from './EditUser';
import axios from 'axios';
//Single App için routing 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {

    state = {
        users: [],
        searchQuery: "",
    }

    async getUsers() {
        const response = await axios.get("http://localhost:3002/users");
        this.setState({ users: response.data })
    }

    componentDidMount() {
        this.getUsers();
    }

    // DELETE USER
    deleteUser = async (user) => {

        axios.delete(`http://localhost:3002/users/${user.id}`)
        const newUserList = this.state.users.filter(
            m => m.id !== user.id
        );
        this.setState(state => ({
            users: newUserList
        }))
    }

    // SEARCH USER
    searchUser = (event) => {
        this.setState({ searchQuery: event.target.value })
    }

    // ADD USER
    addUser = async (user) => {
        await axios.post(`http://localhost:3002/users/`, user)
        this.setState(state => ({
            users: state.users.concat([user])
        }))

        this.getUsers();
    }

    // EDIT USER
    editUser = async (id, updatedUser) => {
        await axios.put(`http://localhost:3002/users/${id}`, updatedUser)
        this.getUsers();
    }

    render() {

        //silinen kaydın id sini almadan filtreleme
        let filteredUsers = this.state.users.filter(
            (user) => {
                //toLowerCase: büyük küçük harf farketmeden aratması için 
                return user.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
            //en son girilenin en başa gelmesi için
        ).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
        });       

        return (
            // Router--> url deki değişimleri inceleyerek ilgili ekrana yönlendiriyor
            <Router> 
                <div className="container">

                    <Switch>
                        {/* patch="/" ilk açıldığında gözükenler  
                        eaxt yazmasaydım hepsinde / bu olduğu için /add de de search ve list i gösterecekti*/}
                        <Route path="/" exact render={() => (
                            //JSX yapısında tek bir ana div olması lazım bu yapısı o yüzden kullandım
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <SearchBar searchUserProp={this.searchUser} />
                                    </div>
                                </div>

                                <UserList
                                    users= {filteredUsers}
                                    //bu prop listedeki onClick e verilecek
                                    deleteUserProp={this.deleteUser}
                                /> 
                            </React.Fragment>
                            )}>

                        </Route>

                        {/* ekle dediğimde olaşacak link 
                        history--> gittiğimiz linklerin saklandığı yer
                        push-->film eklendikten sonra ana sayfaya(/) dönsün*/}
                        <Route path="/add" render={({ history }) => (
                            <AddUser
                                onAddUser={(user) => {
                                    this.addUser(user)
                                    history.push("/")
                                }
                                }
                            />
                            )}>

                        </Route>

                        {/* edit dediğimde olaşacak link */}
                        <Route path="/edit/:id" render={(props) => (
                            <EditUser
                                {...props}
                                onEditUser={(id, user) => {
                                    this.editUser(id, user)
                                }
                                }
                            />
                            )}>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;