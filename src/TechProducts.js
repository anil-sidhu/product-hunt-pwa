import React , {Component} from 'react';
import 'whatwg-fetch';
import {Spinner , Card , CardTitle, CardText, CardActions , Button , CardMenu , IconButton , Snackbar} from 'react-mdl';

const style = {
	margin : 'auto',
	top : 0,
	left : 0,
	bottom : 0,
	right : 0,
	position : 'fixed'
}

class TechProducts extends Component {

	constructor(props) {
		super(props);
		this.state = {
			posts : [], 
			isLoaded : false,
			isOffline : false
		}

		this.hideIndicator = this.hideIndicator.bind(this);
		this.showIndicator = this.showIndicator.bind(this);
	}

	hideIndicator() {
		this.setState({
			isOffline : false
		})
	}

	showIndicator() {
		this.setState({
			isOffline : true
		})
	}

	componentDidMount() {
		window.addEventListener('offline',this.showIndicator);

		fetch('https://api.producthunt.com/v1/categories/tech/posts', {
            method: 'get',
            headers: {
            'Authorization': 'Bearer 4bf782db360dd58f4411996195a4c3173e058cd5f14e169dfb31387c4701fe48'
            }
        }).then((response) => {
			return response.json()
		}).then((data) => {
			this.setState({
				posts : data.posts,
				isLoaded : true
			});

			localStorage.setItem("techposts",JSON.stringify(data.posts));
		}).catch((err) => {
			this.setState({
				posts : JSON.parse(localStorage.getItem("techposts")),
				isLoaded : true
			})
		}) 
	}

	render() {
		return(
			<div>
				{
					!this.state.isLoaded && 
					<Spinner style={style}/>
				}
				{
					this.state.posts.map((post) => {
			          return (
			          	<div>
			              <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
			                <CardTitle style={{color: '#fff', height: '176px', background: `url(${post.thumbnail.image_url}) center / cover`}}>
			                  {post.tagline}
			                </CardTitle>
			                <CardText>
			                    Posted by {post.user.username}
			                </CardText>
			                <CardActions border>
			                    <Button colored>Show {post.comments_count} comments</Button>
			                </CardActions>
			              </Card>
			              <br />
			              <br />
			            </div>
			          )
        		})
			}

			<Snackbar active={this.state.isOffline} action="Undo">
				Now you are offline, but still your application works!
			</Snackbar>
			</div>
		)
	}
}

export default TechProducts;