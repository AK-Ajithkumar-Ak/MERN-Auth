
export const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className='d-flex gap-2 '>
			<span className=''>
				<Icon className='text-success' />
			</span>
			<input
				{...props}
				className=' form-control mb-3'
			/>
		</div>
  )
}
