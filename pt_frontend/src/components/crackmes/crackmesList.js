import { useEffect, useState } from 'react';
import { crackmesService } from '../../services/crackmes';


export const CrackmesList = () => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("start")
        crackmesService.getCrackmes().then(d => {
            setTasks(d)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }, [])

    const renderTasks = () => {
        return tasks.map(t => {
            return <div>{t.name}</div>
        })
    }

    return (
        <div>
            {loading && <div>laduje sie</div>}
            {!loading && renderTasks()}
        </div>
    )
}