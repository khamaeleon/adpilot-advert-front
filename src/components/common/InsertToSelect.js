import "../../assets/dragSelect.css"
import {useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
const dtoList = [
  {"time" : 1,"ratio" :0},
  {"time" : 2,"ratio" :0},
  {"time" : 3,"ratio" :0},
  {"time" : 4,"ratio" :0},
  {"time" : 5,"ratio" :0},
  {"time" : 6,"ratio" :0},
  {"time" : 7,"ratio" :0},
  {"time" : 8,"ratio" :0},
  {"time" : 9,"ratio" :0},
  {"time" : 10,"ratio" :0},
  {"time" : 11,"ratio" :0},
  {"time" : 12,"ratio" :0},
  {"time" : 13,"ratio" :0},
  {"time" : 14,"ratio" :0},
  {"time" : 15,"ratio" :0},
  {"time" : 16,"ratio" :0},
  {"time" : 17,"ratio" :0},
  {"time" : 18,"ratio" :0},
  {"time" : 19,"ratio" :0},
  {"time" : 20,"ratio" :0},
  {"time" : 21,"ratio" :0},
  {"time" : 22,"ratio" :0},
  {"time" : 23,"ratio" :0},
  {"time" : 24,"ratio" :0},
]
const weeksInfo = {
  'MONDAY':'월',
  'TUESDAY':'화',
  'WEDNESDAY':'수',
  'THURSDAY':'목',
  'FRIDAY':'금',
  'SATURDAY':'토',
  'SUNDAY':'일'
}
export default function InsertToSelect({userId}) {
  const disabled = "cell-disabled"
  const enabled = "cell-enabled-input"
  const allowTimes = [
    {
      "dayOfWeek": "MONDAY",
      "dtoList" : []
    },
    {
      "dayOfWeek": "TUESDAY",
      "dtoList" : []
    },
    {
      "dayOfWeek": "WEDNESDAY",
      "dtoList" : []
    },
    {
      "dayOfWeek": "THURSDAY",
      "dtoList" : []
    },
    {
      "dayOfWeek": "FRIDAY",
      "dtoList" : []
    },
    {
      "dayOfWeek": "SATURDAY",
      "dtoList" : []
    },
    {
      "dayOfWeek": "SUNDAY",
      "dtoList" : []
    },
  ]
  const [insertDayTimeRatio, setInsertDayTimeRatio] = useState([])
  const {register, handleSubmit,formState:{errors}} = useForm()
  const handleChangeInput = (e) => {
    if((/^(0|[1-9]\d*)(\.\d+)?$/).test(e.target.value) || e.target.value === "") {
      if(e.target.value <= 100) {
        setInsertDayTimeRatio({
          ...insertDayTimeRatio,
          [e.target.name]: {
            value: {
              dayOfWeek:e.target.className,
              time:e.target.id,
              ratio: e.target.value
            }
          }
        })
        console.log(`uniqueKey: ${e.target.name},dayOfWeek: ${e.target.className}, time:${e.target.id}, ratio: ${e.target.value}`)
        console.log(insertDayTimeRatio[e.target.name]?.value.ratio)
      } else {
        toast('100보다 큰 수는 입력할수없습니다.')
      }
    } else {
      toast('숫자만 입력해줘요')
    }
  }

  const onSubmit = (data) => {

  }
  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="table-drag-select">
        <tbody>
        <tr>
          <td className={disabled}/>
          <td className={disabled}>1시</td>
          <td className={disabled}>2시</td>
          <td className={disabled}>3시</td>
          <td className={disabled}>4시</td>
          <td className={disabled}>5시</td>
          <td className={disabled}>6시</td>
          <td className={disabled}>7시</td>
          <td className={disabled}>8시</td>
          <td className={disabled}>9시</td>
          <td className={disabled}>10시</td>
          <td className={disabled}>11시</td>
          <td className={disabled}>12시</td>
          <td className={disabled}>13시</td>
          <td className={disabled}>14시</td>
          <td className={disabled}>15시</td>
          <td className={disabled}>16시</td>
          <td className={disabled}>17시</td>
          <td className={disabled}>18시</td>
          <td className={disabled}>19시</td>
          <td className={disabled}>20시</td>
          <td className={disabled}>21시</td>
          <td className={disabled}>22시</td>
          <td className={disabled}>23시</td>
          <td className={disabled}>24시</td>
        </tr>
        {allowTimes.map((weeks,key) => {
          return (
            <tr key={key}>
              <td className={disabled}>{weeksInfo[weeks.dayOfWeek]}</td>
              {dtoList.map((day, idx) => {
                return (
                  <td className={enabled} key={idx}>
                    <input
                      type={'text'}
                      className={weeks.dayOfWeek}
                      id={idx}
                      name={`${weeks.dayOfWeek}${idx}`}
                      value={insertDayTimeRatio[`${weeks.dayOfWeek}${idx}`]?.value.ratio || ''}
                      onChange={(e) => handleChangeInput(e)}
                    />
                    <span className={'cell-input-percent'}>%</span>
                  </td>
                )
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
    </form>
  )
}

