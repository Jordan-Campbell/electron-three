import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Menu from '../components/Menu';
import BabylonRenderer, {PrimitiveType} from '../components/Babylon'

import './styles.scss';

class App extends React.Component<any, any> {

  private renderer: BabylonRenderer
  private sceneRoot: HTMLCanvasElement

  constructor(props: any) {
    super(props);
    this.state = { headerMessage: 'Editor Demo' }
    this.onButtonClick = this.onButtonClick.bind(this);
    this.renderer = new BabylonRenderer();
  }

  // When a button is clicked we tell the Babylon manager to add either a cube or
  // a sphere. Our React component only contains an entry point for the Babylon
  // scene - so we have to pass messages down to it, rather than via components.
  onButtonClick(type: PrimitiveType) {
    this.renderer.createElement(type)
  }

  componentDidMount() {
    // When the component first loads we attach the three js scene to a div.
    // Scene((this as any).sceneRoot)
    this.renderer.initialize( this.sceneRoot )
  }

  render() {
    return (
      <div className="grid-container">

        <div className="header">
          <h1>{this.state.headerMessage}</h1>
        </div>

        <div className="content">
          <div className="menu">

            <Menu onButtonClick={this.onButtonClick}/>

          </div>
          <div className="editor">
              <canvas className="editor__canvas" ref={element => (this as any).sceneRoot = element} />
          </div>

        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
