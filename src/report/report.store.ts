
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { IncidentReport, IncidentReportEnum } from './entities'
import moment from 'moment'
import { reportService } from '.'
import { IDispatch } from '../dispatch'

export const reportStore = defineStore('report', () => {

    const _store = 'reportStore: '

    const startDate = ref('')
    const endDate = ref('')
    const filter = ref(IncidentReportEnum.CUSTOM)
    const today = ref(new Date());


    const isDisabledDates = computed( () => filter.value !== IncidentReportEnum.CUSTOM)
    const isDisabledReportBtn = computed( () => !(!!startDate.value && !!endDate.value))

    const lastWeekStartDate = computed(() => {
        return moment(today.value).subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
    });

    const lastWeekEndDate = computed(() => {
        return moment(today.value).subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');
    });

    const thisWeekStartDate = computed(() => {
        return moment(today.value).startOf('week').format('YYYY-MM-DD');
    });

    const thisWeekEndDate = computed(() => {
        return moment(today.value).endOf('week').format('YYYY-MM-DD');
    });

    const lastMonthStartDate = computed(() => {
        return moment(today.value).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
    });

    const lastMonthEndDate = computed(() => {
        return moment(today.value).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
    });

    const thisMonthStartDate = computed(() => {
        return moment(today.value).startOf('month').format('YYYY-MM-DD');
    });

    const thisMonthEndDate = computed(() => {
        return moment(today.value).endOf('month').format('YYYY-MM-DD');
    });

    const onChangeFilter = (_filter: IncidentReportEnum) => {
        console.log(_store + 'onChangeFilter()', _filter)
        filter.value = _filter

        if(_filter === IncidentReportEnum.LAST_WEEK){
            startDate.value = lastWeekStartDate.value
            endDate.value = lastWeekEndDate.value
            return 
        }

        if(_filter === IncidentReportEnum.THIS_WEEK){
            startDate.value = thisWeekStartDate.value
            endDate.value = thisWeekEndDate.value
            return 
        }

        if(_filter === IncidentReportEnum.LAST_MONTH){
            startDate.value = lastMonthStartDate.value
            endDate.value = lastMonthEndDate.value
            return 
        }

        if(_filter === IncidentReportEnum.THIS_MONTH){
            startDate.value = thisMonthStartDate.value
            endDate.value = thisMonthEndDate.value
            return 
        }
    }

    const getDispatchesByDate = async(payload: {startDate: string, endDate: string}): Promise<IncidentReport[]> => {
        console.log(_store + 'generateReport()', payload)
        return await reportService.getDispatchesByDate(payload)
    }

    const formatTime = (payload: any) => {
        if(payload){
            const date = new Date(payload)
            return moment(date).format('h:mm A')
        }
        return ''
    }

    const formatDate = (payload: any) => {
        if(payload){
            const date = new Date(payload)
            return moment(date).format('MMMM D, YYYY');
        }
        return ''
    }

    const formatDispatchDate = (payload: any) => {
        if(payload){
            const date = new Date(payload)
            return moment(date).format('M/D/YY h:mm A');
        }
        return ''
    }

    const getStatus = (item: IDispatch) => {
        if(item.is_completed){
            return 'Completed'
        }

        return 'Ongoing'
    }

    return {
        startDate,
        endDate,
        filter,
        isDisabledDates,
        isDisabledReportBtn,

        onChangeFilter,
        getDispatchesByDate,
        formatTime,
        formatDate,
        formatDispatchDate,
        getStatus,
    }
})



