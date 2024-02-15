import { Component } from 'react'

class Carousel extends Component {
  state = {
    active: 0,
  }

  // when we don't pass a prop to Carousel component defaultProp is used
  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/non.jpg'],
  }

  // will be run once everytime the component rendered on the DOM
  componentDidMount() {}

  // every single time when state updated
  componentDidUpdate(){}

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index // dataset means all data-* attributes in img tag
    })
  }

  render() {
    const { active } = this.state
    const { images } = this.props

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              key={photo}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel
