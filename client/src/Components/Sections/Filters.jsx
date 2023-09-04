import styles from './filter.module.css'
import Category from '../Cards/Category.card';
const filterData=[
    {
        id:0,
        name:"All",
        Image:"./food.webp"
    },
    {
        id:1,
        name:"food",
        Image:"./food.webp"
    },
    {
        id:2,
        name:"health and fitness",
        Image:"./health&fitness.jpg"
    },
    {
        id:3,
        name:"travel",
        Image:"./travel.png"
    },
    {
        id:4,
        name:"movies",
        Image:"./movies.jpg"
    },
    {
        id:5,
        name:"education",
        Image:"./education.webp"
    }

]
const Filters = () => {
    return (
        <>
        <div className={styles.filter}>
            <ol className={styles.list}>
                {filterData.map(({id,name,Image})=><li key={id} className={styles.item}><Category categoryName={name} Image={Image}/></li>)}
            </ol>
        </div>
        </>
    );
}

export default Filters;
