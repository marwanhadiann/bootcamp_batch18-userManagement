
import { useDispatch, useSelector } from 'react-redux'
import { plus, minus, reset } from './store/counterSlice'

function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    return (
        <div className='flex flex-col items-center gap-4'>
            <p className='text-lg font-semibold'>{count}</p>
            <div className='flex gap-2'>
                <button className='px-4 py-2 bg-red-500 text-white rounded' onClick={() => dispatch(minus())}>-</button>
                <button className='px-4 py-2 bg-green-500 text-white rounded' onClick={() => dispatch(plus())}>+</button>
            </div>
            <button className='px-4 py-2 bg-gray-500 text-white rounded' onClick={() => dispatch(reset())}>Back to 0</button>
        </div>
    )
}

export default Counter
