import React from 'react'
import { useState } from 'react'
import RadioBtn from './utils/RadioBtn';

const QuestionFilters = ({ searchParams, setSearchParams }) => {

  const currSearchParams = Object.fromEntries([...searchParams]);
  const { answerFilter } = currSearchParams;

  const [formData, setFormData] = useState({
    answerFilter: answerFilter || "", // value belongs to [noAnswer, hasAnswer, hasAcceptedAnswer]
  });

  const handleAnswerFilterChange = (name, value, checked) => {
    if (!checked)
      setFormData({ ...formData, answerFilter: "" });
    else
      setFormData({ ...formData, answerFilter: value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.answerFilter) {
      setSearchParams({ ...currSearchParams, answerFilter: formData.answerFilter });
    }
    else {
      searchParams.delete("answerFilter");
      setSearchParams(searchParams);
    }
  }

  return (
    <>
      <div className='sm:mx-8 p-4 bg-sky-50 dark:bg-gray-800 border-2 border-sky-200 dark:border-none rounded-md'>
        <h4 className='text-lg'>Filters</h4>

        <form>
          <div>
            <RadioBtn label="No answer" id="no-answer" name="answerFilter" value='noAnswer' checked={formData.answerFilter === "noAnswer"} onChange={handleAnswerFilterChange} />
            <RadioBtn label="Has answer" id="has-answer" name="answerFilter" value="hasAnswer" checked={formData.answerFilter === "hasAnswer"} onChange={handleAnswerFilterChange} />
            <RadioBtn label="Has accepted answer" id="has-accepted-answer" name="answerFilter" value="hasAcceptedAnswer" checked={formData.answerFilter === "hasAcceptedAnswer"} onChange={handleAnswerFilterChange} />
          </div>
          <button className='px-3 py-1.5 font-semibold dark:text-black bg-sky-400 hover:bg-sky-500 transition rounded-[3px]' onClick={handleSubmit}>Apply</button>
        </form>

      </div>
    </>
  )
}

export default QuestionFilters