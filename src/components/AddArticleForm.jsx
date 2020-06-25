import React from 'react';
import Dropzone from 'react-dropzone';

class AddArticleForm extends React.Component {
  state = {
    titleError: false,
    title: '',
    descError: false,
    description: '',
    uploadedImage: "",
    imageError: false,
  }

  componentDidMount() {
    const { editId, currArticle } = this.props;
    if (editId) {
      let image = document.getElementById('imageCanvas');
      let btn = document.getElementById('imageCanvas-btn');
      if(currArticle.articleImage){
        image.classList.remove('d-none');
        btn.classList.remove('d-none');
      }
      image.src = currArticle.articleImage;
      this.setState({
        title: currArticle.title,
        description: currArticle.description,
        uploadedImage: currArticle.articleImage || '',
      });
    }
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitHandler = e => {
    e && e.preventDefault();
    const { title, description } = this.state;
    if (title && description) {
      this.setArticleData();
    } else {
      if (!title) {
        this.setState({
          titleError: true,
        });
      } else {
        this.setState({
          titleError: false,
        });
      }
      if (!description) {
        this.setState({
          descError: true,
        });
      } else {
        this.setState({
          descError: false,
        });
      }
    }
  }

  setArticleData = () => {
    const { title, description, uploadedImage } = this.state;
    const { addArticleHandle } = this.props;
    addArticleHandle(title, description, uploadedImage);
  }

  mediauploadHandler = event => {
    const me = this;
    let reader = new FileReader();

    reader.onload = function (event) {
      let image = document.getElementById('imageCanvas');
      let btn = document.getElementById('imageCanvas-btn');
      me.setState({
        uploadedImage: event.target.result
      }, () => {
        image.classList.remove('d-none');
        btn.classList.remove('d-none');
        image.src = event.target.result;
      })
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  render() {
    const { titleError, descError, uploadedImage, imageError, description, title } = this.state;
    return (
      <form className="needs-validation"
        onSubmit={this.submitHandler}
        noValidate>
        <div className="row">
          <div className="col">
            <div className="row mb-4">
              <div className="col">
                <label
                  htmlFor="titleText"
                  className="black-text"
                >
                  <strong> Title :</strong>

                </label>
                <input
                  value={title}
                  type="text"
                  id="titleText"
                  onChange={this.changeHandler}
                  className={`form-control ${titleError ? 'is-invalid' : ''}`}
                  name="title"
                  placeholder="Add title of your article"
                  required
                />
                {titleError &&
                  <div className="invalid-feedback">
                    Please provide a title.
              </div>}
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <label
                  htmlFor="description"
                  className="black-text"
                >
                  <strong>Description :</strong>
                </label>
                <textarea
                  value={description}
                  type="text"
                  id="description"
                  onChange={this.changeHandler}
                  className={`form-control ${descError ? 'is-invalid' : ''}`}
                  name="description"
                  placeholder="Add titie of your article"
                  required
                />
                {descError &&
                  <div className="invalid-feedback">
                    Please provide a description.
              </div>}
              </div>
            </div>
            <div className="row">
              <div className="col">

                <img id="imageCanvas" className="d-none" src="" alt="media" height="180px"
                  width="250" />
                <button type="button" className=" close d-none float-none" id="imageCanvas-btn" aria-label="Close" onClick={() => {
                  const imageElemnt = document.getElementById('imageCanvas');
                  const imageclosebtn = document.getElementById('imageCanvas-btn');
                  imageElemnt.classList.add('d-none');
                  imageElemnt.src = "";
                  imageclosebtn.classList.add('d-none');
                  this.setState({
                    uploadedImage: '',
                  })
                }}>
                  <span aria-hidden="true">×</span>
                </button>
                {!uploadedImage &&
                  <Dropzone
                    onDrop={acceptedFiles => {
                      const filteredFiles = acceptedFiles.filter(file => {
                        return file.type.includes('image');
                      });
                      if (filteredFiles.length !== acceptedFiles.length) {
                        this.setState({
                          imageError: true,
                        })
                      } else {
                        const event = {
                          target: {
                            files: acceptedFiles,
                          },
                        };
                        this.mediauploadHandler(event);
                      }
                    }}
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        className={`dropzone-upload-wrapper `}
                      >
                        <div className="" key="default" {...getRootProps()}>
                          <div className="upload_file_content d-flex align-items-center">
                            <input
                              type="file"
                              id="file"
                              style={{ display: 'none' }}
                              {...getInputProps()}
                              accept={['image/*, video/*']}
                            />
                            <div className="drag-and-drop w-100">
                              <p className="h4 grey-text">
                                Drag & Drop Image for your article
                        </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>}
                {imageError &&
                  <div className="invalid-feedback d-block">
                    You can only add image files.
              </div>}
              </div>
            </div>

          </div>
        </div>
      </form>
    )
  }
}

export default AddArticleForm;