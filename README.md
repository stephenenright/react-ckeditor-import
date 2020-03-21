## react-ckeditor-import

Component that integrates [CKEditor](https://ckeditor.com/) with React js

## Installation

```
npm install react-chkeditor-import
```

## Example

```js

class Example extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null,
        }
    }

  
    onChange(event){
      this.setState({
        content: event.editor.getData()
      })
    }
    
    render() {
        return (
            <CKEditor 
              content={this.state.content} 
              events={{
                "change": this.onChange
              }}
             className="my-editor"   
             />
        )
    }
}
```