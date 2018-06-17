import Debug from 'debug'
import { Question, Answer } from '../models'

const debug = new Debug('platzi-overflow:db-api:question')

export default {
    findAll: (sort) => {
        debug(`finding all questions by ${sort}`)
        return Question.find().populate('answers').sort(sort)
    },
    findById: (_id) => {
        debug(`Find question by id=${_id}`)
        return Question
            .findOne({ _id })
            .populate('user')
            .populate({
                path: 'answers',
                options: { sort: '-createdAt' },
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })
    },
    create: (q) => {
        debug(`Creatinn new question=${q}`)
        const question = new Question(q)
        return question.save()
    },
    createAnswer: async (q, a) => {
        const answer = new Answer(a)
        const savedAnswer = await answer.save()
        q.answers.push(savedAnswer)
        await q.save()
        return savedAnswer
    }
}