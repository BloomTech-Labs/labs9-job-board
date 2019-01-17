import React from "react";
import {
  PostJobForm,
  InputTitles,
  Input,
  InputContainer,
  TextArea
} from "./jobFormStyling";

const JobForm = props => {
  return (
    <div>
      <PostJobForm onSubmit={props.addJob}>
        <InputContainer>
          <InputTitles for="title">Title</InputTitles>
          <Input
            id="title"
            value={props.title}
            name="title"
            onChange={props.handleInput}
            placeholder="Job Title"
          />
        </InputContainer>
        <InputContainer>
          <InputTitles>Salary</InputTitles>
          <Input
            value={props.salary}
            name="salary"
            onChange={props.handleInput}
            placeholder="Salary Range"
          />
        </InputContainer>
        <InputContainer>
          <InputTitles>Top Skills</InputTitles>
          <Input
            value={props.topSkills}
            name="topSkills"
            onChange={props.handleInput}
            placeholder="Top Skills"
          />
        </InputContainer>
        <InputContainer>
          <InputTitles>AdditionalSkills</InputTitles>
          <Input
            value={props.additionalSkills}
            name="additionalSkills"
            onChange={props.handleInput}
            placeholder="Additional Skills"
          />
        </InputContainer>
        <InputContainer>
          <InputTitles>Familiar With</InputTitles>
          <Input
            value={props.familiarWith}
            name="familiarWith"
            onChange={props.handleInput}
            placeholder="Remaining Skills"
          />
        </InputContainer>
        <InputContainer>
          <InputTitles>Description</InputTitles>
          <TextArea
            value={props.description}
            name="description"
            onChange={props.handleInput}
            placeholder="Job Description"
          />
        </InputContainer>
        <InputContainer>
          <InputTitles>Requirements</InputTitles>
          <TextArea
            value={props.requirements}
            name="requirements"
            onChange={props.handleInput}
            placeholder="Job Requirements"
          />
        </InputContainer>
        <h5>Active</h5>
        <Input type="checkbox" name="active" value={props.active} />
        <h5>This requires a degree</h5>
        <Input
          type="checkbox"
          name="requiresDegree"
          value={props.requiresDegree}
        />
        <button type="reset" onClick={props.handleInput}>
          Cancel
        </button>
        <button type="submit" onClick={props.handleInput}>
          Save
        </button>
      </PostJobForm>
    </div>
  );
};

export default JobForm;
