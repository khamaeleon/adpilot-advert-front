import "../../assets/dragSelect.css"
import {toast} from "react-toastify";
import {useAtom} from "jotai/index";
import {
  timeBudgetDetailDataAtom, timesInfo,
  weeksInfo
} from "../../pages/settings/entity/BudgetTime";

export default function InsertToSelect(props) {
  const disabled = "cell-disabled"
  const enabled = "cell-enabled-input"
  const [timeBudgetDetailDataState, setTimeBudgetDetailDataState] = useAtom(timeBudgetDetailDataAtom)

  const handleChangeInput = (e) => {
    if((/^(0|[1-9]\d*)(\.\d+)?$/).test(e.target.value) || e.target.value === "") {
      if(e.target.value <= 100) {
        setTimeBudgetDetailDataState({
          ...timeBudgetDetailDataState,
          allowTimes: timeBudgetDetailDataState.allowTimes.map((r,i)=> {return i === parseInt(e.target.id) ? r.map((c,j)=> {return j === parseInt(e.target.name) ? e.target.value : c}) : r})
        })
      } else {
        toast('100보다 큰 수는 입력할수없습니다.')
      }
    } else {
      toast('숫자만 입력해주세요')
    }
  }

  return(
      <table className="table-drag-select">
        <tbody>
        <tr>
          {timesInfo.map((data, index) => {
            return <td key={index} className={disabled}>{data.time + data.label}</td>
          })}
        </tr>
        {timeBudgetDetailDataState.allowTimes.map((weeks,key) => {
          return (
            <tr key={key} className={(key === props.checkWeek) ? 'not-validation' : ''}>
              <td className={disabled}>{weeksInfo[key].week}</td>
              {weeks.map((day, idx) => {
                return (
                  <td className={enabled} key={idx}>
                    <input
                      type={'text'}
                      className={key+'-'+day}
                      id={key}
                      name={`${idx}`}
                      value={day}
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
  )
}

