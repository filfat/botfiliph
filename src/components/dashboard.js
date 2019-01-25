import chatbox from "../components/widgets/chatbox";
import userbox from "../components/widgets/userbox";
import stream from "../components/widgets/stream";

export default (base) => {
    return `
        <div class="Dashboard">
            <div class="grid">
                <div class="grid-item">${stream(base)}</div>
                <div class="grid-item">${chatbox(base)}</div>
                <div class="grid-item">${userbox(base)}</div>
            </div>

            <script>
                var $grid = $('.grid').packery({
                    itemSelector: '.grid-item',
                    columnWidth: 15
                });
                
                $grid.find('.grid-item').each( function( i, gridItem ) {
                    var draggie = new Draggabilly( gridItem );
                    $grid.packery( 'bindDraggabillyEvents', draggie );
                });
            </script>
        </div>
    `;
};