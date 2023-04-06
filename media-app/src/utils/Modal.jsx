export const Modal = ({ showModal,_handleModal,modalTitle, children }) => {

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={`${showModal}`}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{modalTitle} </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
 
          {children}   
           

          </div>
          <div className="modal-footer">
            <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal" onClick={()=>_handleModal(null)} >Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}