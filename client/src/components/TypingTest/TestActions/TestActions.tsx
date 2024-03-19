import { MdRestartAlt } from "react-icons/md";
import { TbArrowBarToLeft } from "react-icons/tb";

import { Button } from '../../Button/Button';
import { useTestStore } from '../../../stores/TestStore';

import '../TestActions/TestActions.scss';

export const TestActions = () => {
	const { redoTest, resetTest } = useTestStore();

	return (
		<div className='test-actions'>
			<Button icon={<TbArrowBarToLeft/>} onClick={redoTest}/>
			<Button icon={<MdRestartAlt/>} onClick={resetTest}/>
		</div>
	);
}
