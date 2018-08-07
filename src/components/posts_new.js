import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
// the reduxForm is a helper function that communicates with reducers.
// it's very similar to the "connect" helper.

class PostsNew extends Component {
  renderField(field) {
    // the "field" arg contains event handlers that bind the Field to the input generated via JSX.
    const { meta: { touched, error } } = field; // ES6 destructuring
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type="text"
          className="form-control"
          {...field.input}
        />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values) {
    // this === component (because we bound it in the onSubmit prop in <form>.)
    this.props.createPost(values, () => {
      this.props.history.push('/'); // programmatic navigation
    });
  }

  render() {
    const { handleSubmit } = this.props;
    // handleSubmit is a prop that is being passed to the component on behalf of reduxForm.

    // Redux Form handles the state of our form.
    // It does NOT handle POSTing our data to some back-end server.
    // When we actually have to do things with the data from the form, that's still up to us.
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField} />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField} />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField} />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-secondary">Cancel</Link>
        </form>
      </div>
    )
  }
}

// values arg contains what the user has entered into the form.
// { title: 'title', categories: 'whatever', content: 'content'}
// return an object that we create as part of this function.
function validate(values) {
  const errors = {};

  // Validate the iputs from 'values'
  if (!values.title) {
    errors.title = 'Please enter a post title.'
  }

  if (!values.content) {
    errors.content = 'Please enter post content.'
  }

  // If errors is an empty obj, the form is fine to submit.
  // If there are any properties on the object, Redux Form assumes form is invalid.
  return errors;
}

// reduxForm is adding additional props here to the passed component.
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
  // Result of this gets put in as the second arg for the redux form helper.
);
