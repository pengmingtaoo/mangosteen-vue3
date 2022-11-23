import s from './welcome.module.scss';
import { FunctionalComponent } from "vue";
import { Icon } from "../../shared/Icon"

export const First: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <svg>
        <use xlinkHref="#pig"></use>
      </svg>
      <h2>
        会挣钱
        <br />
        还会省钱
      </h2>
    </div>
  )
}

First.displayName = 'First'
