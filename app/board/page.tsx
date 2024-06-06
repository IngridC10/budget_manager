import dynamic from 'next/dynamic';

const KanbanBoard = dynamic(() => import('./components/kanbanBoard'), {
    ssr: false,
  });
export default  function BoardPage(){
    return (
        <>
             <KanbanBoard />
        </>
    );
}
