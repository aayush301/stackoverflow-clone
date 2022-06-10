import React from 'react'
import { convertToXTimeAgo } from './date'

const QWithAnsPdf = ({ question, answers }) => {
  return (
    <div id='q-with-ans-pdf' className='mx-auto py-[20px] px-[50px] text-[13px] w-[460px] leading-[20px]' style={{ fontFamily: "sans-serif" }}>

      <h1 className='text-lg mb-4 py-2 border-b-2 border-[#24ab8f]'>Knowledge Bytes</h1>

      <h2 className='my-2 w-[100px] pb-2 border-b-2 border-red-500'>Question</h2>
      <h2 className='text-2xl'>{question.title}</h2>
      <div className='mt-4'>Asked {convertToXTimeAgo(question.createdAt)} by {question.questioner?.name}</div>

      <div className='mt-4 mb-8 bg-gray-100 px-4 py-3 rounded-sm'>
        <div className='original-styles' dangerouslySetInnerHTML={{ __html: question.body }}></div>
      </div>

      <h2 className='my-2 w-[100px] pb-2 border-b-2 border-red-500'>Answers</h2>
      {answers.map(answer => (
        <div key={answer._id} className='my-4 bg-gray-100 p-3 rounded-sm'>
          <div className='original-styles' dangerouslySetInnerHTML={{ __html: answer.text }}></div>
          <div className='flex'>
            <span className='ml-auto'>Answered at {convertToXTimeAgo(answer.createdAt)} by {answer.answerer?.name} </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QWithAnsPdf