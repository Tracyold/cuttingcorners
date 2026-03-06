(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
;
;
;
function connect(param) {
    var addMessageListener = param.addMessageListener, sendMessage = param.sendMessage, _param_onUpdateError = param.onUpdateError, onUpdateError = _param_onUpdateError === void 0 ? console.error : _param_onUpdateError;
    addMessageListener(function(msg) {
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(var i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    var queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: function(param) {
            var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(param, 2), chunkPath = _param[0], callback = _param[1];
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = queued[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], callback = _step_value[1];
                subscribeToChunkUpdate(chunkPath, sendMessage, callback);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
}
var updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
        type: 'turbopack-subscribe'
    }, resource));
    return function() {
        sendJSON(sendMessage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
            type: 'turbopack-unsubscribe'
        }, resource));
    };
}
function handleSocketConnected(sendMessage) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = updateCallbackSets.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key = _step.value;
            subscribeToUpdates(sendMessage, JSON.parse(key));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
// we aggregate all pending updates until the issues are resolved
var chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    var key = resourceKey(msg.resource);
    var aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chunkListsWithPendingUpdates.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var msg = _step.value;
            triggerUpdate(msg);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    var chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    var merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            var update = updateA.merged[0];
            for(var i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(var i1 = 0; i1 < updateB.merged.length; i1++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i1]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks: chunks,
        merged: merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    var chunks = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(chunksA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], chunkUpdateA = _step_value[1];
            var chunkUpdateB = chunksB[chunkPath];
            if (chunkUpdateB != null) {
                var mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
                if (mergedUpdate != null) {
                    chunks[chunkPath] = mergedUpdate;
                }
            } else {
                chunks[chunkPath] = chunkUpdateA;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.entries(chunksB)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step1.value, 2), chunkPath1 = _step_value1[0], chunkUpdateB1 = _step_value1[1];
            if (chunks[chunkPath1] == null) {
                chunks[chunkPath1] = chunkUpdateB1;
            }
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    var entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    var chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries: entries,
        chunks: chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, entriesA, entriesB);
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    var chunks = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(chunksA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], chunkUpdateA = _step_value[1];
            var chunkUpdateB = chunksB[chunkPath];
            if (chunkUpdateB != null) {
                var mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
                if (mergedUpdate != null) {
                    chunks[chunkPath] = mergedUpdate;
                }
            } else {
                chunks[chunkPath] = chunkUpdateA;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.entries(chunksB)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step1.value, 2), chunkPath1 = _step_value1[0], chunkUpdateB1 = _step_value1[1];
            if (chunks[chunkPath1] == null) {
                chunks[chunkPath1] = chunkUpdateB1;
            }
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        var _updateA_modules, _updateB_modules;
        var added = [];
        var deleted = [];
        var deletedModules = new Set((_updateA_modules = updateA.modules) !== null && _updateA_modules !== void 0 ? _updateA_modules : []);
        var addedModules = new Set((_updateB_modules = updateB.modules) !== null && _updateB_modules !== void 0 ? _updateB_modules : []);
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = addedModules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var moduleId = _step.value;
                if (!deletedModules.has(moduleId)) {
                    added.push(moduleId);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = deletedModules[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var moduleId1 = _step1.value;
                if (!addedModules.has(moduleId1)) {
                    deleted.push(moduleId1);
                }
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                    _iterator1.return();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added: added,
            deleted: deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        var _updateA_added, _updateB_added, _updateA_deleted, _updateB_deleted;
        var added1 = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_added = updateA.added) !== null && _updateA_added !== void 0 ? _updateA_added : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_added = updateB.added) !== null && _updateB_added !== void 0 ? _updateB_added : [])));
        var deleted1 = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_deleted = updateA.deleted) !== null && _updateA_deleted !== void 0 ? _updateA_deleted : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_deleted = updateB.deleted) !== null && _updateB_deleted !== void 0 ? _updateB_deleted : [])));
        if (updateB.added != null) {
            var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
            try {
                for(var _iterator2 = updateB.added[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                    var moduleId2 = _step2.value;
                    deleted1.delete(moduleId2);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                    }
                } finally{
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        if (updateB.deleted != null) {
            var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
            try {
                for(var _iterator3 = updateB.deleted[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                    var moduleId3 = _step3.value;
                    added1.delete(moduleId3);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                        _iterator3.return();
                    }
                } finally{
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
        return {
            type: 'partial',
            added: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(added1),
            deleted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(deleted1)
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        var _updateA_modules1, _updateB_added1, _updateB_deleted1;
        var modules = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_modules1 = updateA.modules) !== null && _updateA_modules1 !== void 0 ? _updateA_modules1 : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_added1 = updateB.added) !== null && _updateB_added1 !== void 0 ? _updateB_added1 : [])));
        var _iteratorNormalCompletion4 = true, _didIteratorError4 = false, _iteratorError4 = undefined;
        try {
            for(var _iterator4 = ((_updateB_deleted1 = updateB.deleted) !== null && _updateB_deleted1 !== void 0 ? _updateB_deleted1 : [])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true){
                var moduleId4 = _step4.value;
                modules.delete(moduleId4);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                    _iterator4.return();
                }
            } finally{
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
        return {
            type: 'added',
            modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(modules)
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        var _updateB_modules1;
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        var modules1 = new Set((_updateB_modules1 = updateB.modules) !== null && _updateB_modules1 !== void 0 ? _updateB_modules1 : []);
        if (updateA.added != null) {
            var _iteratorNormalCompletion5 = true, _didIteratorError5 = false, _iteratorError5 = undefined;
            try {
                for(var _iterator5 = updateA.added[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true){
                    var moduleId5 = _step5.value;
                    modules1.delete(moduleId5);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                        _iterator5.return();
                    }
                } finally{
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
        return {
            type: 'deleted',
            modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(modules1)
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error("Invariant: ".concat(message));
}
var CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    var aI = list.indexOf(a) + 1 || list.length;
    var bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
var chunksWithIssues = new Map();
function emitIssues() {
    var issues = [];
    var deduplicationSet = new Set();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chunksWithIssues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), _ = _step_value[0], chunkIssues = _step_value[1];
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = chunkIssues[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var chunkIssue = _step1.value;
                    if (deduplicationSet.has(chunkIssue.formatted)) continue;
                    issues.push(chunkIssue);
                    deduplicationSet.add(chunkIssue.formatted);
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    var key = resourceKey(msg.resource);
    var hasCriticalIssues = false;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = msg.issues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var issue = _step.value;
            if (CRITICAL.includes(issue.severity)) {
                hasCriticalIssues = true;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
var SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
var CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort(function(a, b) {
        var first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
var hooks = {
    beforeRefresh: function() {},
    refresh: function() {},
    buildOk: function() {},
    issues: function(_issues) {}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            var runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    var key = resourceKey(resource);
    var callbackSet;
    var existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return function() {
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    var key = resourceKey(msg.resource);
    var callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = callbackSet.callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var callback = _step.value;
            callback(msg);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/lib/supabase.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServiceClient",
    ()=>createServiceClient,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [client] (ecmascript) <locals>");
;
;
var supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM"));
function createServiceClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "fmtDate",
    ()=>fmtDate,
    "fmtTime",
    ()=>fmtTime,
    "formatMoney",
    ()=>formatMoney,
    "relativeTime",
    ()=>relativeTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [client] (ecmascript)");
;
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatMoney(value) {
    if (value == null || isNaN(Number(value))) return '$0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(Number(value));
}
function fmtDate(timestamp) {
    if (!timestamp) return '—';
    var d = new Date(timestamp);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
function fmtTime(timestamp) {
    if (!timestamp) return '—';
    var d = new Date(timestamp);
    return d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}
function relativeTime(timestamp) {
    if (!timestamp) return '';
    var now = Date.now();
    var then = new Date(timestamp).getTime();
    var diff = now - then;
    var seconds = Math.floor(diff / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    if (seconds < 60) return 'just now';
    if (minutes < 60) return "".concat(minutes, "m ago");
    if (hours < 24) return "".concat(hours, "h ago");
    if (days < 7) return "".concat(days, "d ago");
    return fmtDate(timestamp);
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/account/InvoiceList.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InvoiceList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [client] (ecmascript)");
;
;
;
function InvoiceList(param) {
    var _this = this;
    var invoices = param.invoices;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '28px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '24px',
                    color: '#FAFAFA',
                    marginBottom: '24px'
                },
                children: "Invoices"
            }, void 0, false, {
                fileName: "[project]/components/account/InvoiceList.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            invoices.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "acc-empty",
                children: "No invoices"
            }, void 0, false, {
                fileName: "[project]/components/account/InvoiceList.tsx",
                lineNumber: 11,
                columnNumber: 32
            }, this) : invoices.map(function(inv) {
                var _inv_line_items;
                var item = (_inv_line_items = inv.line_items) === null || _inv_line_items === void 0 ? void 0 : _inv_line_items[0];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: '#0A0A0A',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '16px',
                        marginBottom: '12px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: '16px',
                                            color: '#FAFAFA'
                                        },
                                        children: (item === null || item === void 0 ? void 0 : item.title) || 'Product'
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InvoiceList.tsx",
                                        lineNumber: 18,
                                        columnNumber: 17
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '10px',
                                            color: 'rgba(255,255,255,0.35)',
                                            marginTop: '4px'
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(inv.paid_at)
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InvoiceList.tsx",
                                        lineNumber: 19,
                                        columnNumber: 17
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/account/InvoiceList.tsx",
                                lineNumber: 17,
                                columnNumber: 15
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'right'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Courier New', monospace",
                                            fontSize: '17px',
                                            color: 'rgb(48, 177, 98)'
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatMoney"])(inv.total_amount)
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InvoiceList.tsx",
                                        lineNumber: 22,
                                        columnNumber: 17
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '8px',
                                            fontWeight: 500,
                                            letterSpacing: '0.2em',
                                            textTransform: 'uppercase',
                                            padding: '2px 6px',
                                            background: 'rgba(45,212,191,0.08)',
                                            color: 'rgba(45,212,191,0.8)'
                                        },
                                        children: "PAID"
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InvoiceList.tsx",
                                        lineNumber: 23,
                                        columnNumber: 17
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/account/InvoiceList.tsx",
                                lineNumber: 21,
                                columnNumber: 15
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/InvoiceList.tsx",
                        lineNumber: 16,
                        columnNumber: 13
                    }, _this)
                }, inv.invoice_id, false, {
                    fileName: "[project]/components/account/InvoiceList.tsx",
                    lineNumber: 15,
                    columnNumber: 11
                }, _this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/account/InvoiceList.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = InvoiceList;
var _c;
__turbopack_context__.k.register(_c, "InvoiceList");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/account/WorkOrderList.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkOrderList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [client] (ecmascript)");
;
;
;
var STATUS_COLORS = {
    CREATED: {
        bg: 'rgba(212,175,55,0.12)',
        color: '#d4af37'
    },
    ACCEPTED: {
        bg: 'rgba(45,212,191,0.12)',
        color: 'rgba(45,212,191,1)'
    },
    COMPLETED: {
        bg: 'rgba(255,255,255,0.06)',
        color: 'rgba(255,255,255,0.45)'
    },
    CONFIRMED: {
        bg: 'rgba(120,80,200,0.12)',
        color: '#b388ff'
    },
    CANCELLED: {
        bg: 'rgba(181,64,64,0.1)',
        color: '#c07070'
    }
};
function WorkOrderList(param) {
    var _this = this;
    var workOrders = param.workOrders, onSelect = param.onSelect, onAccept = param.onAccept;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '28px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    fontFamily: "'Oranienbaum', serif",
                    fontSize: '24px',
                    color: '#FAFAFA',
                    marginBottom: '24px'
                },
                children: "Work Orders"
            }, void 0, false, {
                fileName: "[project]/components/account/WorkOrderList.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            workOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em'
                },
                children: "No work orders"
            }, void 0, false, {
                fileName: "[project]/components/account/WorkOrderList.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this) : workOrders.map(function(wo) {
                var _STATUS_COLORS_wo_status, _STATUS_COLORS_wo_status1;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: '#0A0A0A',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '16px',
                        marginBottom: '12px',
                        cursor: 'pointer'
                    },
                    onClick: function() {
                        return onSelect(wo);
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '16px',
                                        color: '#FAFAFA'
                                    },
                                    children: wo.title
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderList.tsx",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '8px',
                                        fontWeight: 500,
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        padding: '3px 7px',
                                        background: (_STATUS_COLORS_wo_status = STATUS_COLORS[wo.status]) === null || _STATUS_COLORS_wo_status === void 0 ? void 0 : _STATUS_COLORS_wo_status.bg,
                                        color: (_STATUS_COLORS_wo_status1 = STATUS_COLORS[wo.status]) === null || _STATUS_COLORS_wo_status1 === void 0 ? void 0 : _STATUS_COLORS_wo_status1.color
                                    },
                                    children: wo.status
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderList.tsx",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/account/WorkOrderList.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, _this),
                        wo.service_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '11px',
                                color: 'rgba(255,255,255,0.45)',
                                marginBottom: '4px'
                            },
                            children: wo.service_type
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderList.tsx",
                            lineNumber: 30,
                            columnNumber: 31
                        }, _this),
                        wo.estimated_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '19px',
                                color: 'rgb(48, 177, 98)',
                                fontFamily: "'Courier New', monospace"
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatMoney"])(wo.estimated_price)
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderList.tsx",
                            lineNumber: 31,
                            columnNumber: 34
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '10px',
                                color: 'rgba(255,255,255,0.35)',
                                marginTop: '8px'
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(wo.created_at)
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderList.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, _this),
                        wo.status === 'CREATED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: function(e) {
                                e.stopPropagation();
                                onAccept(wo);
                            },
                            className: "acc-btn-gold",
                            style: {
                                marginTop: '12px',
                                width: 'auto',
                                padding: '8px 16px'
                            },
                            children: "Accept Work Order"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderList.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, _this)
                    ]
                }, wo.work_order_id, true, {
                    fileName: "[project]/components/account/WorkOrderList.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, _this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/account/WorkOrderList.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = WorkOrderList;
var _c;
__turbopack_context__.k.register(_c, "WorkOrderList");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/account/InquiryList.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InquiryList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [client] (ecmascript)");
;
;
;
var SERVICE_TYPES = [
    'Custom Rough Cut',
    'Re-Cut & Re-Polish — Starting Price: $249',
    'Table Re-Polish — Starting Price: $119',
    'Crown Re-Polish — Starting Price: $149',
    'Pavilion Re-Polish — Starting Price: $149',
    'Gemstone Material Cut Design — Starting Price: $99',
    'Virtual Consultation — Free 30 Minute Minimum Consultation'
];
function InquiryList(param) {
    var _this = this;
    var inquiries = param.inquiries, serviceRequests = param.serviceRequests, inquiryTab = param.inquiryTab, setInquiryTab = param.setInquiryTab, showSRForm = param.showSRForm, srType = param.srType, srDesc = param.srDesc, srSubmitting = param.srSubmitting, srGateMsg = param.srGateMsg, setSrType = param.setSrType, setSrDesc = param.setSrDesc, setShowSRForm = param.setShowSRForm, onOpenSRForm = param.onOpenSRForm, onSubmitSR = param.onSubmitSR;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '28px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '24px',
                    color: '#FAFAFA',
                    marginBottom: '16px'
                },
                children: "Inquiries"
            }, void 0, false, {
                fileName: "[project]/components/account/InquiryList.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '20px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "acc-tab ".concat(inquiryTab === 'inquiries' ? 'on' : ''),
                        onClick: function() {
                            return setInquiryTab('inquiries');
                        },
                        children: "Product Inquiries"
                    }, void 0, false, {
                        fileName: "[project]/components/account/InquiryList.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "acc-tab ".concat(inquiryTab === 'service' ? 'on' : ''),
                        onClick: function() {
                            return setInquiryTab('service');
                        },
                        children: "Service Requests"
                    }, void 0, false, {
                        fileName: "[project]/components/account/InquiryList.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/account/InquiryList.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            inquiryTab === 'inquiries' ? inquiries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "acc-empty",
                children: "No product inquiries"
            }, void 0, false, {
                fileName: "[project]/components/account/InquiryList.tsx",
                lineNumber: 44,
                columnNumber: 34
            }, this) : inquiries.map(function(inq) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: '#0A0A0A',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '14px',
                        marginBottom: '10px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.65)',
                                marginBottom: '6px'
                            },
                            children: inq.description
                        }, void 0, false, {
                            fileName: "[project]/components/account/InquiryList.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: '10px',
                                color: 'rgba(255,255,255,0.35)'
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(inq.created_at)
                        }, void 0, false, {
                            fileName: "[project]/components/account/InquiryList.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, _this)
                    ]
                }, inq.account_inquiry_id, true, {
                    fileName: "[project]/components/account/InquiryList.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, _this);
            }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "acc-btn-gold",
                        style: {
                            marginBottom: '16px',
                            width: 'auto',
                            padding: '10px 20px'
                        },
                        onClick: onOpenSRForm,
                        children: "Submit Service Request"
                    }, void 0, false, {
                        fileName: "[project]/components/account/InquiryList.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    srGateMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.55)',
                            background: 'rgba(214,180,70,0.08)',
                            padding: '12px',
                            marginBottom: '16px',
                            lineHeight: 1.6
                        },
                        children: srGateMsg
                    }, void 0, false, {
                        fileName: "[project]/components/account/InquiryList.tsx",
                        lineNumber: 56,
                        columnNumber: 25
                    }, this),
                    showSRForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: '#0A0A0A',
                            border: '1px solid rgba(255,255,255,0.06)',
                            padding: '20px',
                            marginBottom: '16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "acc-label",
                                children: "Service Type *"
                            }, void 0, false, {
                                fileName: "[project]/components/account/InquiryList.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: srType,
                                onChange: function(e) {
                                    return setSrType(e.target.value);
                                },
                                style: {
                                    width: '100%',
                                    background: '#0A0A0A',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    color: '#FAFAFA',
                                    padding: '10px',
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '13px',
                                    marginBottom: '12px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Select service type"
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InquiryList.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this),
                                    SERVICE_TYPES.map(function(st) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: st,
                                            children: st
                                        }, st, false, {
                                            fileName: "[project]/components/account/InquiryList.tsx",
                                            lineNumber: 64,
                                            columnNumber: 42
                                        }, _this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/account/InquiryList.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "acc-label",
                                children: "Description *"
                            }, void 0, false, {
                                fileName: "[project]/components/account/InquiryList.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: srDesc,
                                onChange: function(e) {
                                    return setSrDesc(e.target.value);
                                },
                                placeholder: "Describe your request...",
                                style: {
                                    width: '100%',
                                    background: '#0A0A0A',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    color: '#FAFAFA',
                                    padding: '10px',
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '13px',
                                    minHeight: '96px',
                                    resize: 'vertical',
                                    marginBottom: '12px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/account/InquiryList.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.45)',
                                    fontStyle: 'italic',
                                    marginBottom: '16px',
                                    lineHeight: 1.6
                                },
                                children: "All prices are estimated starting prices. Some gems may be less, some may be more. No work order prices are set in stone until I am able to inspect the piece and the customer accepts the work order through the website."
                            }, void 0, false, {
                                fileName: "[project]/components/account/InquiryList.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "acc-btn-gold",
                                        onClick: onSubmitSR,
                                        disabled: srSubmitting || !srType || !srDesc.trim(),
                                        style: {
                                            width: 'auto',
                                            padding: '10px 20px'
                                        },
                                        children: srSubmitting ? 'Submitting...' : 'Submit'
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InquiryList.tsx",
                                        lineNumber: 73,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "acc-btn-ghost",
                                        onClick: function() {
                                            return setShowSRForm(false);
                                        },
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/InquiryList.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/account/InquiryList.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/InquiryList.tsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, this),
                    serviceRequests.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "acc-empty",
                        children: "No service requests"
                    }, void 0, false, {
                        fileName: "[project]/components/account/InquiryList.tsx",
                        lineNumber: 81,
                        columnNumber: 43
                    }, this) : serviceRequests.map(function(sr) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: '#0A0A0A',
                                border: '1px solid rgba(255,255,255,0.06)',
                                padding: '14px',
                                marginBottom: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '11px',
                                        color: '#d4af37',
                                        marginBottom: '4px'
                                    },
                                    children: sr.service_type
                                }, void 0, false, {
                                    fileName: "[project]/components/account/InquiryList.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: '13px',
                                        color: 'rgba(255,255,255,0.65)',
                                        marginBottom: '6px'
                                    },
                                    children: sr.description
                                }, void 0, false, {
                                    fileName: "[project]/components/account/InquiryList.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '10px',
                                        color: 'rgba(255,255,255,0.35)'
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(sr.created_at)
                                }, void 0, false, {
                                    fileName: "[project]/components/account/InquiryList.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, _this)
                            ]
                        }, sr.service_request_id, true, {
                            fileName: "[project]/components/account/InquiryList.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, _this);
                    })
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/components/account/InquiryList.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = InquiryList;
var _c;
__turbopack_context__.k.register(_c, "InquiryList");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/account/HomeTab.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [client] (ecmascript)");
;
;
;
;
;
;
var smToggles = [
    {
        label: 'Work Order Updates',
        col: 'opt_in_work_orders'
    },
    {
        label: 'Tracking Updates',
        col: 'opt_in_tracking'
    },
    {
        label: 'Chat Message Alerts',
        col: 'opt_in_chat'
    },
    {
        label: 'Purchase Confirmations',
        col: 'opt_in_purchases'
    },
    {
        label: 'New Gem Listings',
        col: 'opt_in_new_listings'
    }
];
function HomeTab(param) {
    var _this = this;
    var editProfile = param.editProfile, profile = param.profile, profileSaving = param.profileSaving, profileFlash = param.profileFlash, hasProfileChanges = param.hasProfileChanges, invoiceCount = param.invoiceCount, invoiceTotal = param.invoiceTotal, smsPrefs = param.smsPrefs, setEditProfile = param.setEditProfile, saveProfile = param.saveProfile, toggleSms = param.toggleSms;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '28px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    fontFamily: "'comfortaa', serif",
                    fontSize: '24px',
                    color: '#FAFAFA',
                    marginBottom: '24px'
                },
                children: "Profile"
            }, void 0, false, {
                fileName: "[project]/components/account/HomeTab.tsx",
                lineNumber: 32,
                columnNumber: 17
            }, this),
            editProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gap: '12px',
                    maxWidth: '500px'
                },
                children: [
                    [
                        {
                            label: 'Name',
                            key: 'name',
                            placeholder: 'Full name'
                        },
                        {
                            label: 'Email',
                            key: 'email',
                            placeholder: 'Email'
                        },
                        {
                            label: 'Phone',
                            key: 'phone',
                            placeholder: 'Phone'
                        },
                        {
                            label: 'Shipping Address',
                            key: 'shipping_address',
                            placeholder: 'Address'
                        },
                        {
                            label: 'Business Name',
                            key: 'business_name',
                            placeholder: 'Add business name'
                        }
                    ].map(function(f) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "acc-label",
                                    children: f.label
                                }, void 0, false, {
                                    fileName: "[project]/components/account/HomeTab.tsx",
                                    lineNumber: 43,
                                    columnNumber: 25
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "acc-input",
                                    value: editProfile[f.key] || '',
                                    placeholder: f.placeholder,
                                    onChange: function(e) {
                                        return setEditProfile((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, editProfile), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, f.key, e.target.value)));
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/account/HomeTab.tsx",
                                    lineNumber: 44,
                                    columnNumber: 25
                                }, _this)
                            ]
                        }, f.key, true, {
                            fileName: "[project]/components/account/HomeTab.tsx",
                            lineNumber: 42,
                            columnNumber: 23
                        }, _this);
                    }),
                    hasProfileChanges && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '8px',
                            marginTop: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "acc-btn-gold",
                                onClick: saveProfile,
                                disabled: profileSaving,
                                children: profileSaving ? 'Saving...' : 'Save'
                            }, void 0, false, {
                                fileName: "[project]/components/account/HomeTab.tsx",
                                lineNumber: 50,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "acc-btn-ghost",
                                onClick: function() {
                                    return setEditProfile((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, profile));
                                },
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/components/account/HomeTab.tsx",
                                lineNumber: 53,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 49,
                        columnNumber: 23
                    }, this),
                    profileFlash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#d4af37',
                            fontSize: '11px'
                        },
                        children: "✓ Saved"
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 56,
                        columnNumber: 38
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/account/HomeTab.tsx",
                lineNumber: 34,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '32px',
                    padding: '20px',
                    background: '#0A0A0A',
                    border: '1px solid rgba(255,255,255,0.06)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "'Courier New', monospace",
                            fontSize: '19px',
                            color: 'rgb(48, 177, 98)'
                        },
                        children: invoiceCount
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 62,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '17px',
                            color: 'rgba(255,255,255,0.55)',
                            marginLeft: '8px'
                        },
                        children: "items purchased"
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 63,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            margin: '0 12px',
                            color: 'rgba(255,255,255,0.15)'
                        },
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 64,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "'Courier New', monospace",
                            fontSize: '18px',
                            color: 'rgb(48, 177, 98)'
                        },
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatMoney"])(invoiceTotal)
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 65,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.55)',
                            marginLeft: '8px'
                        },
                        children: "total spent"
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 66,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/account/HomeTab.tsx",
                lineNumber: 61,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '32px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            color: 'rgba(255,255,255,0.55)',
                            marginBottom: '16px'
                        },
                        children: "Notification Preferences"
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 71,
                        columnNumber: 19
                    }, this),
                    smToggles.map(function(t) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 0',
                                borderBottom: '1px solid rgba(255,255,255,0.06)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '13px',
                                        color: 'rgba(255,255,255,0.65)'
                                    },
                                    children: t.label
                                }, void 0, false, {
                                    fileName: "[project]/components/account/HomeTab.tsx",
                                    lineNumber: 74,
                                    columnNumber: 23
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: function() {
                                        return toggleSms(t.col, !(smsPrefs === null || smsPrefs === void 0 ? void 0 : smsPrefs[t.col]));
                                    },
                                    style: {
                                        width: '40px',
                                        height: '22px',
                                        borderRadius: '11px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        background: (smsPrefs === null || smsPrefs === void 0 ? void 0 : smsPrefs[t.col]) ? '#d4af37' : 'rgba(255,255,255,0.12)',
                                        transition: 'background 200ms'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: '16px',
                                            height: '16px',
                                            borderRadius: '50%',
                                            background: '#fff',
                                            position: 'absolute',
                                            top: '3px',
                                            left: (smsPrefs === null || smsPrefs === void 0 ? void 0 : smsPrefs[t.col]) ? '21px' : '3px',
                                            transition: 'left 200ms'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/HomeTab.tsx",
                                        lineNumber: 82,
                                        columnNumber: 25
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/components/account/HomeTab.tsx",
                                    lineNumber: 75,
                                    columnNumber: 23
                                }, _this)
                            ]
                        }, t.col, true, {
                            fileName: "[project]/components/account/HomeTab.tsx",
                            lineNumber: 73,
                            columnNumber: 21
                        }, _this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.35)',
                            marginTop: '12px',
                            fontStyle: 'italic'
                        },
                        children: "We'll send SMS alerts to your phone number on file"
                    }, void 0, false, {
                        fileName: "[project]/components/account/HomeTab.tsx",
                        lineNumber: 89,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/account/HomeTab.tsx",
                lineNumber: 70,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/account/HomeTab.tsx",
        lineNumber: 31,
        columnNumber: 15
    }, this);
}
_c = HomeTab;
var _c;
__turbopack_context__.k.register(_c, "HomeTab");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/account/WorkOrderDetailModal.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkOrderDetailModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [client] (ecmascript)");
;
;
;
;
;
;
;
;
;
var STATUS_COLORS = {
    CREATED: {
        bg: 'rgba(212,175,55,0.12)',
        color: '#d4af37'
    },
    ACCEPTED: {
        bg: 'rgba(45,212,191,0.12)',
        color: 'rgba(45,212,191,1)'
    },
    COMPLETED: {
        bg: 'rgba(255,255,255,0.06)',
        color: 'rgba(255,255,255,0.45)'
    },
    CONFIRMED: {
        bg: 'rgba(120,80,200,0.12)',
        color: '#b388ff'
    },
    CANCELLED: {
        bg: 'rgba(181,64,64,0.1)',
        color: '#c07070'
    }
};
function WorkOrderDetailModal(param) {
    var _this = this;
    var selectedWO = param.selectedWO, adminInfo = param.adminInfo, profile = param.profile, showAddressEdit = param.showAddressEdit, tempAddress = param.tempAddress, addressConfirmed = param.addressConfirmed, setSelectedWO = param.setSelectedWO, setShowAddressEdit = param.setShowAddressEdit, setTempAddress = param.setTempAddress, setAddressConfirmed = param.setAddressConfirmed, setWorkOrders = param.setWorkOrders, acceptWO = param.acceptWO;
    var _STATUS_COLORS_selectedWO_status, _STATUS_COLORS_selectedWO_status1;
    if (!selectedWO) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        },
        onClick: function(e) {
            if (e.target === e.currentTarget) {
                setSelectedWO(null);
                setShowAddressEdit(false);
                setAddressConfirmed(false);
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: '#0A0A0A',
                border: '1px solid rgba(255,255,255,0.10)',
                padding: '40px',
                maxWidth: '680px',
                width: '100%',
                maxHeight: '92vh',
                overflowY: 'auto',
                borderRadius: '2px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '24px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '10px',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: 'rgba(255,255,255,0.35)',
                                        marginBottom: '4px'
                                    },
                                    children: "Work Order"
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Oranienbaum', serif",
                                        fontSize: '23px',
                                        color: 'rgba(255,255,255,0.88)'
                                    },
                                    children: selectedWO.title
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: '9px',
                                fontWeight: 500,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                padding: '4px 9px',
                                background: (_STATUS_COLORS_selectedWO_status = STATUS_COLORS[selectedWO.status]) === null || _STATUS_COLORS_selectedWO_status === void 0 ? void 0 : _STATUS_COLORS_selectedWO_status.bg,
                                color: (_STATUS_COLORS_selectedWO_status1 = STATUS_COLORS[selectedWO.status]) === null || _STATUS_COLORS_selectedWO_status1 === void 0 ? void 0 : _STATUS_COLORS_selectedWO_status1.color
                            },
                            children: selectedWO.status
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                adminInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '16px',
                        padding: '17px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '11px',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: 'rgba(255,255,255,0.35)'
                                    },
                                    children: "Send To"
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        color: '#ffd700'
                                    },
                                    children: "← SEND TO THIS ADDRESS"
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.65)',
                                lineHeight: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: '#d4af37',
                                        fontWeight: 600,
                                        fontSize: '16px'
                                    },
                                    children: adminInfo.business_name
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: adminInfo.full_name
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: adminInfo.address
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: adminInfo.contact_email
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: adminInfo.phone
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 51,
                    columnNumber: 11
                }, this),
                profile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '21px',
                        padding: '17px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '11px',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: 'rgba(255,255,255,0.35)'
                                    },
                                    children: "Return To"
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase',
                                                color: '#ffd700'
                                            },
                                            children: "RETURN TO THIS ADDRESS →"
                                        }, void 0, false, {
                                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                            lineNumber: 72,
                                            columnNumber: 17
                                        }, this),
                                        selectedWO.status === 'CREATED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: function() {
                                                setTempAddress(selectedWO.wo_shipping_address || profile.shipping_address || '');
                                                setShowAddressEdit(true);
                                            },
                                            style: {
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontSize: '9px',
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase',
                                                background: 'none',
                                                border: '1px solid rgba(255,255,255,0.15)',
                                                color: 'rgba(255,255,255,0.5)',
                                                padding: '4px 8px',
                                                cursor: 'pointer'
                                            },
                                            children: "Edit"
                                        }, void 0, false, {
                                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                            lineNumber: 74,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.65)',
                                lineHeight: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: 'rgba(255,255,255,0.85)',
                                        fontSize: '16px'
                                    },
                                    children: profile.name
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: profile.email
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this),
                                profile.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: profile.phone
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 84,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: '#FAFAFA'
                                    },
                                    children: selectedWO.wo_shipping_address || profile.shipping_address || 'No address on file'
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                selectedWO.wo_shipping_address && selectedWO.wo_shipping_address !== profile.shipping_address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '10px',
                                        color: '#ffd700',
                                        marginTop: '4px',
                                        fontStyle: 'italic'
                                    },
                                    children: "* Custom address for this work order only"
                                }, void 0, false, {
                                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                    lineNumber: 87,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 81,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 68,
                    columnNumber: 11
                }, this),
                showAddressEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        padding: '16px',
                        marginBottom: '16px',
                        borderRadius: '4px'
                    },
                    children: !addressConfirmed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '10px',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    color: '#ffd700',
                                    marginBottom: '8px'
                                },
                                children: "Update Return Address"
                            }, void 0, false, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 98,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.55)',
                                    marginBottom: '12px',
                                    lineHeight: 1.6
                                },
                                children: "This change applies to this work order only and does not update your profile. By confirming, you agree this is the address we will ship your item to upon completion."
                            }, void 0, false, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 99,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: tempAddress,
                                onChange: function(e) {
                                    return setTempAddress(e.target.value);
                                },
                                placeholder: "Enter address for this work order...",
                                style: {
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    padding: '10px 12px',
                                    color: '#FAFAFA',
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '13px',
                                    outline: 'none',
                                    marginBottom: '10px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 102,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: function() {
                                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
                                                var log;
                                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                                                    switch(_state.label){
                                                        case 0:
                                                            if (!tempAddress.trim()) return [
                                                                2
                                                            ];
                                                            log = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(Array.isArray(selectedWO.edit_history) ? selectedWO.edit_history : []).concat([
                                                                {
                                                                    action: 'Return address updated by user',
                                                                    by: 'user',
                                                                    at: new Date().toISOString()
                                                                }
                                                            ]);
                                                            return [
                                                                4,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                                                    wo_shipping_address: tempAddress.trim(),
                                                                    edit_history: log
                                                                }).eq('work_order_id', selectedWO.work_order_id)
                                                            ];
                                                        case 1:
                                                            _state.sent();
                                                            setSelectedWO(function(prev) {
                                                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                                                                    wo_shipping_address: tempAddress.trim(),
                                                                    edit_history: log
                                                                });
                                                            });
                                                            setWorkOrders(function(prev) {
                                                                return prev.map(function(w) {
                                                                    return w.work_order_id === selectedWO.work_order_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, w), {
                                                                        wo_shipping_address: tempAddress.trim(),
                                                                        edit_history: log
                                                                    }) : w;
                                                                });
                                                            });
                                                            setAddressConfirmed(true);
                                                            return [
                                                                2
                                                            ];
                                                    }
                                                });
                                            })();
                                        },
                                        style: {
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: '10px',
                                            fontWeight: 600,
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            background: '#d4af37',
                                            color: '#050505',
                                            border: 'none',
                                            padding: '10px 16px',
                                            cursor: 'pointer'
                                        },
                                        children: "Confirm Address"
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                        lineNumber: 106,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: function() {
                                            return setShowAddressEdit(false);
                                        },
                                        style: {
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: '10px',
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            background: 'none',
                                            border: '1px solid rgba(255,255,255,0.10)',
                                            color: 'rgba(255,255,255,0.4)',
                                            padding: '10px 16px',
                                            cursor: 'pointer'
                                        },
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                        lineNumber: 117,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 105,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "'Comfortaa', sans-serif",
                            fontSize: '13px',
                            color: 'rgba(45,212,191,1)'
                        },
                        children: "✓ Address updated for this work order."
                    }, void 0, false, {
                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                        lineNumber: 124,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: '1px',
                        background: 'rgba(255,255,255,0.06)',
                        margin: '16px 0'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this),
                [
                    {
                        label: 'Service Type',
                        val: selectedWO.service_type
                    },
                    {
                        label: 'Gem Type',
                        val: selectedWO.gem_type
                    },
                    {
                        label: 'Est. Turnaround',
                        val: selectedWO.estimated_turnaround
                    },
                    {
                        label: 'Created',
                        val: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.created_at) + ' · ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(selectedWO.created_at)
                    },
                    {
                        label: 'Accepted',
                        val: selectedWO.accepted_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.accepted_at) + ' · ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(selectedWO.accepted_at) : null
                    },
                    {
                        label: 'Confirmed',
                        val: selectedWO.confirmed_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.confirmed_at) + ' · ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(selectedWO.confirmed_at) : null
                    },
                    {
                        label: 'Completed',
                        val: selectedWO.completed_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(selectedWO.completed_at) + ' · ' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(selectedWO.completed_at) : null
                    }
                ].filter(function(r) {
                    return r.val;
                }).map(function(r) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '11px',
                                    letterSpacing: '0.18em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(255,255,255,0.40)'
                                },
                                children: r.label
                            }, void 0, false, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '15px',
                                    color: 'rgba(255,255,255,0.72)'
                                },
                                children: r.val
                            }, void 0, false, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, _this)
                        ]
                    }, r.label, true, {
                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, _this);
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '10px',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)',
                                marginBottom: '6px'
                            },
                            children: "Description"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '15px',
                                color: 'rgba(255,255,255,0.68)',
                                lineHeight: 1.8
                            },
                            children: selectedWO.description
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this),
                selectedWO.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '10px',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)',
                                marginBottom: '6px'
                            },
                            children: "Notes"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.45)',
                                lineHeight: 1.7
                            },
                            children: selectedWO.notes
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 153,
                    columnNumber: 11
                }, this),
                selectedWO.estimated_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        padding: '16px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '10px',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)'
                            },
                            children: "Quoted Price"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Courier New', monospace",
                                fontSize: '22px',
                                color: 'rgba(45,212,191,1)'
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatMoney"])(selectedWO.estimated_price)
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 160,
                    columnNumber: 11
                }, this),
                selectedWO.status === 'COMPLETED' && selectedWO.stripe_payment_link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px',
                        padding: '16px',
                        background: 'rgba(212,175,55,0.06)',
                        border: '1px solid rgba(212,175,55,0.2)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '10px',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)',
                                marginBottom: '10px'
                            },
                            children: "Payment"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 169,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: selectedWO.stripe_payment_link,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '11px',
                                fontWeight: 600,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                background: '#d4af37',
                                color: '#050505',
                                padding: '12px 20px',
                                textDecoration: 'none',
                                display: 'inline-block'
                            },
                            children: "Pay Now"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 168,
                    columnNumber: 11
                }, this),
                selectedWO.status === 'COMPLETED' && selectedWO.paid_outside_site && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px',
                        padding: '14px',
                        background: 'rgba(45,212,191,0.06)',
                        border: '1px solid rgba(45,212,191,0.15)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "'Comfortaa', sans-serif",
                            fontSize: '13px',
                            color: 'rgba(45,212,191,1)'
                        },
                        children: "✓ Payment received — thank you!"
                    }, void 0, false, {
                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                        lineNumber: 178,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 177,
                    columnNumber: 11
                }, this),
                selectedWO.status === 'CONFIRMED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px',
                        padding: '14px',
                        background: 'rgba(179,136,255,0.06)',
                        border: '1px solid rgba(179,136,255,0.2)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "'Comfortaa', sans-serif",
                            fontSize: '13px',
                            color: '#b388ff',
                            lineHeight: 1.6
                        },
                        children: "Your work order has been confirmed! Please send your item to the address above. We'll notify you when we receive it."
                    }, void 0, false, {
                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                        lineNumber: 185,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 184,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: '8px',
                        marginTop: '24px'
                    },
                    children: [
                        selectedWO.status === 'CREATED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "acc-btn-gold",
                            style: {
                                width: 'auto',
                                padding: '10px 20px'
                            },
                            onClick: function() {
                                acceptWO(selectedWO);
                            },
                            children: "Accept Work Order"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 194,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "acc-btn-ghost",
                            onClick: function() {
                                setSelectedWO(null);
                                setShowAddressEdit(false);
                                setAddressConfirmed(false);
                            },
                            style: {
                                marginLeft: 'auto'
                            },
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this),
                selectedWO.edit_history && selectedWO.edit_history.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '28px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: '16px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '10px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)',
                                marginBottom: '10px'
                            },
                            children: "Activity Log"
                        }, void 0, false, {
                            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                            lineNumber: 204,
                            columnNumber: 13
                        }, this),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(selectedWO.edit_history).reverse().map(function(entry, i) {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    padding: '8px 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                                    gap: '12px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            flexWrap: 'wrap'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "'Montserrat', sans-serif",
                                                    fontSize: '10px',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.15em',
                                                    textTransform: 'uppercase',
                                                    padding: '2px 6px',
                                                    background: entry.by === 'admin' ? 'rgba(212,175,55,0.12)' : 'rgba(45,212,191,0.1)',
                                                    color: entry.by === 'admin' ? '#d4af37' : 'rgba(45,212,191,0.9)'
                                                },
                                                children: entry.by
                                            }, void 0, false, {
                                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                                lineNumber: 208,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "'Comfortaa', sans-serif",
                                                    fontSize: '13px',
                                                    color: 'rgba(255,255,255,0.65)'
                                                },
                                                children: entry.action
                                            }, void 0, false, {
                                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                                lineNumber: 209,
                                                columnNumber: 19
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                        lineNumber: 207,
                                        columnNumber: 17
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: '10px',
                                            color: 'rgba(255,255,255,0.3)',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0
                                        },
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtDate"])(entry.at),
                                            " · ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(entry.at)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                        lineNumber: 211,
                                        columnNumber: 17
                                    }, _this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                                lineNumber: 206,
                                columnNumber: 15
                            }, _this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/account/WorkOrderDetailModal.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = WorkOrderDetailModal;
var _c;
__turbopack_context__.k.register(_c, "WorkOrderDetailModal");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/account/ChatPanel.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [client] (ecmascript)");
;
;
;
;
function ChatPanel(param) {
    var _this = this;
    var messages = param.messages, chatInput = param.chatInput, chatSending = param.chatSending, chatUploading = param.chatUploading, chatOpen = param.chatOpen, chatEndRef = param.chatEndRef, chatFileRef = param.chatFileRef, setChatInput = param.setChatInput, setChatOpen = param.setChatOpen, openChatDrawer = param.openChatDrawer, sendChat = param.sendChat, handleChatFile = param.handleChatFile;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "acc-right",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "acc-chat-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '11px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: '#d4af37'
                                },
                                children: "Chat"
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '13px',
                                    color: 'rgba(255,255,255,0.45)',
                                    marginTop: '5px'
                                },
                                children: "We're here to help — don't hesitate to reach out"
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/ChatPanel.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "acc-chat-messages",
                        children: [
                            messages.map(function(m) {
                                var _m_attachment_type;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: m.actor === 'ACCOUNT' ? 'flex-end' : 'flex-start',
                                        marginBottom: '13px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                maxWidth: '80%',
                                                padding: '11px 15px',
                                                borderRadius: '14px',
                                                background: m.actor === 'ACCOUNT' ? 'rgba(45,212,191,1)' : '#d4af37',
                                                color: '#050505',
                                                fontFamily: "'Comfortaa', sans-serif",
                                                fontSize: '15.9px',
                                                lineHeight: 1.7
                                            },
                                            children: [
                                                m.body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: m.body
                                                }, void 0, false, {
                                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                                    lineNumber: 40,
                                                    columnNumber: 28
                                                }, _this),
                                                m.attachment_url && ((_m_attachment_type = m.attachment_type) === null || _m_attachment_type === void 0 ? void 0 : _m_attachment_type.startsWith('image/')) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: m.attachment_url.startsWith('http') ? m.attachment_url : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl,
                                                    alt: "attachment",
                                                    style: {
                                                        maxWidth: '180px',
                                                        maxHeight: '180px',
                                                        objectFit: 'cover',
                                                        marginTop: m.body ? '6px' : '0',
                                                        borderRadius: '6px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                                    lineNumber: 42,
                                                    columnNumber: 19
                                                }, _this),
                                                m.attachment_url && m.attachment_type === 'application/pdf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: m.body ? '7px' : '0',
                                                        fontSize: '15.9px'
                                                    },
                                                    children: [
                                                        "📄 ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: m.attachment_url.startsWith('http') ? m.attachment_url : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            style: {
                                                                color: '#050505',
                                                                textDecoration: 'underline'
                                                            },
                                                            children: "Download PDF"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/account/ChatPanel.tsx",
                                                            lineNumber: 45,
                                                            columnNumber: 91
                                                        }, _this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                                    lineNumber: 45,
                                                    columnNumber: 19
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/account/ChatPanel.tsx",
                                            lineNumber: 35,
                                            columnNumber: 15
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '13px',
                                                color: 'rgba(255,255,255,0.38)',
                                                marginTop: '3px',
                                                fontFamily: "'Montserrat', sans-serif"
                                            },
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(m.created_at)
                                        }, void 0, false, {
                                            fileName: "[project]/components/account/ChatPanel.tsx",
                                            lineNumber: 48,
                                            columnNumber: 15
                                        }, _this)
                                    ]
                                }, m.chat_message_id, true, {
                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, _this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: chatEndRef
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/ChatPanel.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "acc-chat-input-bar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                ref: chatFileRef,
                                accept: ".jpg,.jpeg,.png,.tiff,.tif,.dng,.heic,.pdf",
                                style: {
                                    display: 'none'
                                },
                                onChange: handleChatFile
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: function() {
                                    var _chatFileRef_current;
                                    return (_chatFileRef_current = chatFileRef.current) === null || _chatFileRef_current === void 0 ? void 0 : _chatFileRef_current.click();
                                },
                                disabled: chatUploading,
                                style: {
                                    background: 'none',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    color: 'rgba(255,255,255,0.45)',
                                    padding: '11px',
                                    cursor: 'pointer',
                                    fontSize: '17px',
                                    flexShrink: 0
                                },
                                title: "Attach file",
                                children: chatUploading ? '...' : '📎'
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: chatInput,
                                onChange: function(e) {
                                    return setChatInput(e.target.value);
                                },
                                placeholder: "Type a message...",
                                className: "acc-chat-input",
                                onKeyDown: function(e) {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendChat();
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: sendChat,
                                disabled: chatSending || !chatInput.trim(),
                                className: "acc-chat-send",
                                children: chatSending ? '...' : '→'
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/ChatPanel.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/account/ChatPanel.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "acc-chat-mobile-bar ".concat(chatOpen ? 'hidden' : ''),
                onClick: openChatDrawer,
                children: "Chat with Admin"
            }, void 0, false, {
                fileName: "[project]/components/account/ChatPanel.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            chatOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "acc-chat-mobile-drawer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "acc-chat-header",
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '13px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.3em',
                                    color: '#d4af37'
                                },
                                children: "Chat"
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: function() {
                                    return setChatOpen(false);
                                },
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    color: 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    fontSize: '19px'
                                },
                                children: "↓"
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/ChatPanel.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "acc-chat-messages",
                        style: {
                            flex: 1
                        },
                        children: [
                            messages.map(function(m) {
                                var _m_attachment_type;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: m.actor === 'ACCOUNT' ? 'flex-end' : 'flex-start',
                                        marginBottom: '13px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                maxWidth: '80%',
                                                padding: '11px 15px',
                                                borderRadius: '1.7px',
                                                background: m.actor === 'ACCOUNT' ? 'rgba(45,212,191,1)' : '#d4af37',
                                                color: '#050505',
                                                fontFamily: "'Comfortaa', sans-serif",
                                                fontSize: '17px'
                                            },
                                            children: [
                                                m.body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: m.body
                                                }, void 0, false, {
                                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 30
                                                }, _this),
                                                m.attachment_url && ((_m_attachment_type = m.attachment_type) === null || _m_attachment_type === void 0 ? void 0 : _m_attachment_type.startsWith('image/')) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: m.attachment_url.startsWith('http') ? m.attachment_url : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl,
                                                    alt: "attachment",
                                                    style: {
                                                        maxWidth: '180px',
                                                        maxHeight: '180px',
                                                        objectFit: 'cover',
                                                        marginTop: m.body ? '6px' : '0',
                                                        borderRadius: '6px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 21
                                                }, _this),
                                                m.attachment_url && m.attachment_type === 'application/pdf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: m.body ? '6px' : '0',
                                                        fontSize: '12px'
                                                    },
                                                    children: [
                                                        "📄 ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: m.attachment_url.startsWith('http') ? m.attachment_url : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').getPublicUrl(m.attachment_url).data.publicUrl,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            style: {
                                                                color: '#050505',
                                                                textDecoration: 'underline'
                                                            },
                                                            children: "Download PDF"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/account/ChatPanel.tsx",
                                                            lineNumber: 88,
                                                            columnNumber: 91
                                                        }, _this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 21
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/account/ChatPanel.tsx",
                                            lineNumber: 78,
                                            columnNumber: 17
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '10px',
                                                color: 'rgba(255,255,255,0.38)',
                                                marginTop: '4px'
                                            },
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fmtTime"])(m.created_at)
                                        }, void 0, false, {
                                            fileName: "[project]/components/account/ChatPanel.tsx",
                                            lineNumber: 91,
                                            columnNumber: 17
                                        }, _this)
                                    ]
                                }, m.chat_message_id, true, {
                                    fileName: "[project]/components/account/ChatPanel.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, _this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: chatEndRef
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/ChatPanel.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "acc-chat-input-bar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: function() {
                                    var _chatFileRef_current;
                                    return (_chatFileRef_current = chatFileRef.current) === null || _chatFileRef_current === void 0 ? void 0 : _chatFileRef_current.click();
                                },
                                disabled: chatUploading,
                                style: {
                                    background: 'none',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    color: 'rgba(255,255,255,0.45)',
                                    padding: '10px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    flexShrink: 0
                                },
                                children: chatUploading ? '...' : '📎'
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: chatInput,
                                onChange: function(e) {
                                    return setChatInput(e.target.value);
                                },
                                placeholder: "Type a message...",
                                className: "acc-chat-input",
                                onKeyDown: function(e) {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendChat();
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: sendChat,
                                disabled: chatSending || !chatInput.trim(),
                                className: "acc-chat-send",
                                children: chatSending ? '...' : '→'
                            }, void 0, false, {
                                fileName: "[project]/components/account/ChatPanel.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/account/ChatPanel.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/account/ChatPanel.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_c = ChatPanel;
var _c;
__turbopack_context__.k.register(_c, "ChatPanel");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/account.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AccountPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$InvoiceList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/account/InvoiceList.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$WorkOrderList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/account/WorkOrderList.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$InquiryList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/account/InquiryList.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$HomeTab$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/account/HomeTab.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$WorkOrderDetailModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/account/WorkOrderDetailModal.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$ChatPanel$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/account/ChatPanel.tsx [client] (ecmascript)");
;
;
;
;
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
function AccountPage() {
    var _this = this;
    _s();
    var router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), session = _useState[0], setSession = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true), 2), loading = _useState1[0], setLoading = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('home'), 2), activeTab = _useState2[0], setActiveTab = _useState2[1];
    // Profile
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), profile = _useState3[0], setProfile = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), editProfile = _useState4[0], setEditProfile = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), profileSaving = _useState5[0], setProfileSaving = _useState5[1];
    var _useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), profileFlash = _useState6[0], setProfileFlash = _useState6[1];
    // SMS prefs
    var _useState7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), smsPrefs = _useState7[0], setSmsPrefs = _useState7[1];
    // Purchase stats
    var _useState8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), invoiceCount = _useState8[0], setInvoiceCount = _useState8[1];
    var _useState9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), invoiceTotal = _useState9[0], setInvoiceTotal = _useState9[1];
    // Work orders
    var _useState10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), workOrders = _useState10[0], setWorkOrders = _useState10[1];
    // Inquiries
    var _useState11 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), inquiries = _useState11[0], setInquiries = _useState11[1];
    var _useState12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), serviceRequests = _useState12[0], setServiceRequests = _useState12[1];
    var _useState13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('inquiries'), 2), inquiryTab = _useState13[0], setInquiryTab = _useState13[1];
    var _useState14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showSRForm = _useState14[0], setShowSRForm = _useState14[1];
    var _useState15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), srType = _useState15[0], setSrType = _useState15[1];
    var _useState16 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), srDesc = _useState16[0], setSrDesc = _useState16[1];
    var _useState17 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), srSubmitting = _useState17[0], setSrSubmitting = _useState17[1];
    var _useState18 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), srGateMsg = _useState18[0], setSrGateMsg = _useState18[1];
    // Invoices
    var _useState19 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), invoices = _useState19[0], setInvoices = _useState19[1];
    // Chat
    var _useState20 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), chatThread = _useState20[0], setChatThread = _useState20[1];
    var _useState21 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), messages = _useState21[0], setMessages = _useState21[1];
    var _useState22 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), chatInput = _useState22[0], setChatInput = _useState22[1];
    var _useState23 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), chatSending = _useState23[0], setChatSending = _useState23[1];
    var _useState24 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), chatOpen = _useState24[0], setChatOpen = _useState24[1];
    var chatEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var chatFileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var _useState25 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), chatUploading = _useState25[0], setChatUploading = _useState25[1];
    // Work order detail modal
    var _useState26 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), selectedWO = _useState26[0], setSelectedWO = _useState26[1];
    var _useState27 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showAddressEdit = _useState27[0], setShowAddressEdit = _useState27[1];
    var _useState28 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), tempAddress = _useState28[0], setTempAddress = _useState28[1];
    var _useState29 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), addressConfirmed = _useState29[0], setAddressConfirmed = _useState29[1];
    var _useState30 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), adminInfo = _useState30[0], setAdminInfo = _useState30[1];
    // Auth
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountPage.useEffect": function() {
            var guestId = ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then({
                "AccountPage.useEffect": function(param) {
                    var _param_data = param.data, s = _param_data.session;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                        "AccountPage.useEffect": function() {
                            var _ref, adminCheck;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                                "AccountPage.useEffect": function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            return [
                                                4,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('admin_user_id').eq('admin_user_id', s.user.id).single()
                                            ];
                                        case 1:
                                            _ref = _state.sent(), adminCheck = _ref.data;
                                            if (!s || s.user.id === guestId || adminCheck) {
                                                router.replace('/login');
                                                return [
                                                    2
                                                ];
                                            }
                                            setSession(s);
                                            return [
                                                2
                                            ];
                                    }
                                }
                            }["AccountPage.useEffect"]);
                        }
                    }["AccountPage.useEffect"])();
                }
            }["AccountPage.useEffect"]);
            var _supabase_auth_onAuthStateChange = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "AccountPage.useEffect._supabase_auth_onAuthStateChange": function(_e, s) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                        "AccountPage.useEffect._supabase_auth_onAuthStateChange": function() {
                            var _ref, adminCheck;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                                "AccountPage.useEffect._supabase_auth_onAuthStateChange": function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            if (!s || s.user.id === guestId) {
                                                router.replace('/login');
                                                return [
                                                    2
                                                ];
                                            }
                                            return [
                                                4,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('admin_user_id').eq('admin_user_id', s.user.id).single()
                                            ];
                                        case 1:
                                            _ref = _state.sent(), adminCheck = _ref.data;
                                            if (adminCheck) router.replace('/admin/dashboard');
                                            else setSession(s);
                                            return [
                                                2
                                            ];
                                    }
                                }
                            }["AccountPage.useEffect._supabase_auth_onAuthStateChange"]);
                        }
                    }["AccountPage.useEffect._supabase_auth_onAuthStateChange"])();
                }
            }["AccountPage.useEffect._supabase_auth_onAuthStateChange"]), subscription = _supabase_auth_onAuthStateChange.data.subscription;
            return ({
                "AccountPage.useEffect": function() {
                    return subscription.unsubscribe();
                }
            })["AccountPage.useEffect"];
        }
    }["AccountPage.useEffect"], [
        router
    ]);
    // Load all data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountPage.useEffect": function() {
            var loadAll = function loadAll() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                    "AccountPage.useEffect.loadAll": function() {
                        var _ref, p, _ref1, prefs, _ref2, invs, _ref3, wo, _ref4, admin, _ref5, inq, _ref6, sr, _ref7, inv, _ref8, thread, _ref9, msgs;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                            "AccountPage.useEffect.loadAll": function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('account_users').select('*').eq('account_user_id', uid).single()
                                        ];
                                    case 1:
                                        _ref = _state.sent(), p = _ref.data;
                                        setProfile(p);
                                        setEditProfile(p ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, p) : null);
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('user_sms_preferences').select('*').eq('user_id', uid).single()
                                        ];
                                    case 2:
                                        _ref1 = _state.sent(), prefs = _ref1.data;
                                        setSmsPrefs(prefs);
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('invoices').select('invoice_id, total_amount').eq('account_user_id', uid)
                                        ];
                                    case 3:
                                        _ref2 = _state.sent(), invs = _ref2.data;
                                        if (invs) {
                                            setInvoiceCount(invs.length);
                                            setInvoiceTotal(invs.reduce({
                                                "AccountPage.useEffect.loadAll": function(s, i) {
                                                    return s + Number(i.total_amount || 0);
                                                }
                                            }["AccountPage.useEffect.loadAll"], 0));
                                        }
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').select('*').eq('account_user_id', uid).order('created_at', {
                                                ascending: false
                                            })
                                        ];
                                    case 4:
                                        _ref3 = _state.sent(), wo = _ref3.data;
                                        setWorkOrders(wo || []);
                                        // Realtime work order updates
                                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].channel('user-wo-' + uid).on('postgres_changes', {
                                            event: '*',
                                            schema: 'public',
                                            table: 'work_orders',
                                            filter: "account_user_id=eq.".concat(uid)
                                        }, {
                                            "AccountPage.useEffect.loadAll": function(payload) {
                                                if (payload.eventType === 'INSERT') {
                                                    setWorkOrders({
                                                        "AccountPage.useEffect.loadAll": function(prev) {
                                                            return [
                                                                payload.new
                                                            ].concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(prev));
                                                        }
                                                    }["AccountPage.useEffect.loadAll"]);
                                                } else if (payload.eventType === 'UPDATE') {
                                                    setWorkOrders({
                                                        "AccountPage.useEffect.loadAll": function(prev) {
                                                            return prev.map({
                                                                "AccountPage.useEffect.loadAll": function(w) {
                                                                    return w.work_order_id === payload.new.work_order_id ? payload.new : w;
                                                                }
                                                            }["AccountPage.useEffect.loadAll"]);
                                                        }
                                                    }["AccountPage.useEffect.loadAll"]);
                                                }
                                            }
                                        }["AccountPage.useEffect.loadAll"]).subscribe();
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('business_name, full_name, address, phone, contact_email').single()
                                        ];
                                    case 5:
                                        _ref4 = _state.sent(), admin = _ref4.data;
                                        setAdminInfo(admin);
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('account_inquiries').select('*').eq('account_user_id', uid).order('created_at', {
                                                ascending: false
                                            })
                                        ];
                                    case 6:
                                        _ref5 = _state.sent(), inq = _ref5.data;
                                        setInquiries(inq || []);
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('service_requests').select('*').eq('account_user_id', uid).order('created_at', {
                                                ascending: false
                                            })
                                        ];
                                    case 7:
                                        _ref6 = _state.sent(), sr = _ref6.data;
                                        setServiceRequests(sr || []);
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('invoices').select('*').eq('account_user_id', uid).order('paid_at', {
                                                ascending: false
                                            })
                                        ];
                                    case 8:
                                        _ref7 = _state.sent(), inv = _ref7.data;
                                        setInvoices(inv || []);
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').select('*').eq('account_user_id', uid).single()
                                        ];
                                    case 9:
                                        _ref8 = _state.sent(), thread = _ref8.data;
                                        setChatThread(thread);
                                        if (!thread) return [
                                            3,
                                            13
                                        ];
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_messages').select('*').eq('chat_thread_id', thread.chat_thread_id).order('created_at', {
                                                ascending: true
                                            })
                                        ];
                                    case 10:
                                        _ref9 = _state.sent(), msgs = _ref9.data;
                                        setMessages(msgs || []);
                                        if (!(("TURBOPACK compile-time value", "object") !== 'undefined' && window.innerWidth >= 768)) return [
                                            3,
                                            12
                                        ];
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
                                                account_has_unread: false
                                            }).eq('chat_thread_id', thread.chat_thread_id)
                                        ];
                                    case 11:
                                        _state.sent();
                                        _state.label = 12;
                                    case 12:
                                        // Realtime — dedup against optimistic messages
                                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].channel('user-chat-' + thread.chat_thread_id).on('postgres_changes', {
                                            event: 'INSERT',
                                            schema: 'public',
                                            table: 'chat_messages',
                                            filter: "chat_thread_id=eq.".concat(thread.chat_thread_id)
                                        }, {
                                            "AccountPage.useEffect.loadAll": function(payload) {
                                                var newMsg = payload.new;
                                                setMessages({
                                                    "AccountPage.useEffect.loadAll": function(prev) {
                                                        // Remove optimistic version if present, add real one
                                                        var filtered = prev.filter({
                                                            "AccountPage.useEffect.loadAll.filtered": function(m) {
                                                                return !m.chat_message_id.startsWith('opt-') || m.body !== newMsg.body;
                                                            }
                                                        }["AccountPage.useEffect.loadAll.filtered"]);
                                                        // Avoid exact duplicates by real ID
                                                        if (filtered.some({
                                                            "AccountPage.useEffect.loadAll": function(m) {
                                                                return m.chat_message_id === newMsg.chat_message_id;
                                                            }
                                                        }["AccountPage.useEffect.loadAll"])) return filtered;
                                                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(filtered).concat([
                                                            newMsg
                                                        ]);
                                                    }
                                                }["AccountPage.useEffect.loadAll"]);
                                            }
                                        }["AccountPage.useEffect.loadAll"]).subscribe();
                                        _state.label = 13;
                                    case 13:
                                        setLoading(false);
                                        return [
                                            2
                                        ];
                                }
                            }
                        }["AccountPage.useEffect.loadAll"]);
                    }
                }["AccountPage.useEffect.loadAll"])();
            };
            if (!session) return;
            var uid = session.user.id;
            loadAll();
        }
    }["AccountPage.useEffect"], [
        session
    ]);
    // Scroll chat to bottom
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountPage.useEffect": function() {
            var _chatEndRef_current;
            (_chatEndRef_current = chatEndRef.current) === null || _chatEndRef_current === void 0 ? void 0 : _chatEndRef_current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["AccountPage.useEffect"], [
        messages,
        chatOpen
    ]);
    // Profile save
    var saveProfile = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var updates;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!editProfile || !session) return [
                            2
                        ];
                        setProfileSaving(true);
                        updates = {};
                        if (editProfile.name !== profile.name) updates.name = editProfile.name;
                        if (editProfile.email !== profile.email) updates.email = editProfile.email;
                        if (editProfile.phone !== profile.phone) updates.phone = editProfile.phone;
                        if (editProfile.shipping_address !== profile.shipping_address) updates.shipping_address = editProfile.shipping_address;
                        if (editProfile.business_name !== profile.business_name) updates.business_name = editProfile.business_name;
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('account_users').update(updates).eq('account_user_id', session.user.id)
                        ];
                    case 1:
                        _state.sent();
                        if (!updates.phone) return [
                            3,
                            3
                        ];
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('user_sms_preferences').update({
                                phone: updates.phone
                            }).eq('user_id', session.user.id)
                        ];
                    case 2:
                        _state.sent();
                        _state.label = 3;
                    case 3:
                        setProfile((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, profile, updates));
                        setProfileSaving(false);
                        setProfileFlash(true);
                        setTimeout(function() {
                            return setProfileFlash(false);
                        }, 2000);
                        return [
                            2
                        ];
                }
            });
        })();
    };
    var hasProfileChanges = editProfile && profile && (editProfile.name !== profile.name || editProfile.email !== profile.email || editProfile.phone !== profile.phone || editProfile.shipping_address !== profile.shipping_address || editProfile.business_name !== profile.business_name);
    // SMS toggle
    var toggleSms = function(col, val) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!session) return [
                            2
                        ];
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('user_sms_preferences').upsert((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                                user_id: session.user.id,
                                phone: (profile === null || profile === void 0 ? void 0 : profile.phone) || ''
                            }, col, val), {
                                onConflict: 'user_id'
                            })
                        ];
                    case 1:
                        _state.sent();
                        setSmsPrefs(function(prev) {
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, prev), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, col, val));
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // Accept work order
    var acceptWO = function(wo) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var log;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        log = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(Array.isArray(wo.edit_history) ? wo.edit_history : []).concat([
                            {
                                action: 'ACCEPTED by user',
                                by: 'user',
                                at: new Date().toISOString()
                            }
                        ]);
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('work_orders').update({
                                status: 'ACCEPTED',
                                accepted_at: new Date().toISOString(),
                                edit_history: log
                            }).eq('work_order_id', wo.work_order_id).eq('account_user_id', session.user.id)
                        ];
                    case 1:
                        _state.sent();
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-admin-notification', {
                                body: {
                                    event_type: 'work_orders',
                                    work_order_id: wo.work_order_id
                                }
                            })
                        ];
                    case 2:
                        _state.sent();
                        setWorkOrders(function(prev) {
                            return prev.map(function(w) {
                                return w.work_order_id === wo.work_order_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, w), {
                                    status: 'ACCEPTED',
                                    accepted_at: new Date().toISOString(),
                                    edit_history: log
                                }) : w;
                            });
                        });
                        setSelectedWO(function(prev) {
                            return prev ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                                status: 'ACCEPTED',
                                accepted_at: new Date().toISOString(),
                                edit_history: log
                            }) : prev;
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // Service request gate check
    var openSRForm = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var _ref, prefs, _ref1, p;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('user_sms_preferences').select('opt_in_work_orders').eq('user_id', session.user.id).single()
                        ];
                    case 1:
                        _ref = _state.sent(), prefs = _ref.data;
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('account_users').select('phone').eq('account_user_id', session.user.id).single()
                        ];
                    case 2:
                        _ref1 = _state.sent(), p = _ref1.data;
                        if (!(p === null || p === void 0 ? void 0 : p.phone) || !(prefs === null || prefs === void 0 ? void 0 : prefs.opt_in_work_orders)) {
                            setSrGateMsg('To submit a service request you must have a phone number on file and work order SMS notifications enabled. This keeps you informed every step of the way. Update your preferences in your profile.');
                            return [
                                2
                            ];
                        }
                        setSrGateMsg('');
                        setShowSRForm(true);
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // Submit service request
    var submitSR = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var _ref, sr;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!srType || !srDesc.trim()) return [
                            2
                        ];
                        setSrSubmitting(true);
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('service_requests').insert({
                                account_user_id: session.user.id,
                                service_type: srType,
                                description: srDesc,
                                photo_url: null
                            })
                        ];
                    case 1:
                        _state.sent();
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-admin-notification', {
                                body: {
                                    event_type: 'service_requests',
                                    user_id: session.user.id
                                }
                            })
                        ];
                    case 2:
                        _state.sent();
                        setSrSubmitting(false);
                        setShowSRForm(false);
                        setSrType('');
                        setSrDesc('');
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('service_requests').select('*').eq('account_user_id', session.user.id).order('created_at', {
                                ascending: false
                            })
                        ];
                    case 3:
                        _ref = _state.sent(), sr = _ref.data;
                        setServiceRequests(sr || []);
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // Send chat message
    var sendChat = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var msgText, optimisticMsg, error;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!chatInput.trim() || !chatThread || !session) return [
                            2
                        ];
                        msgText = chatInput;
                        setChatInput('');
                        setChatSending(true);
                        // Optimistic update — show message immediately
                        optimisticMsg = {
                            chat_message_id: 'opt-' + Date.now(),
                            chat_thread_id: chatThread.chat_thread_id,
                            actor: 'ACCOUNT',
                            actor_id: session.user.id,
                            body: msgText,
                            attachment_url: null,
                            attachment_type: null,
                            created_at: new Date().toISOString()
                        };
                        setMessages(function(prev) {
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(prev).concat([
                                optimisticMsg
                            ]);
                        });
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_messages').insert({
                                chat_thread_id: chatThread.chat_thread_id,
                                actor: 'ACCOUNT',
                                actor_id: session.user.id,
                                body: msgText,
                                attachment_url: null,
                                attachment_type: null
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        if (error) {
                            console.error('Chat insert failed:', error.message);
                            // Remove optimistic message on failure, restore input
                            setMessages(function(prev) {
                                return prev.filter(function(m) {
                                    return m.chat_message_id !== optimisticMsg.chat_message_id;
                                });
                            });
                            setChatInput(msgText);
                            setChatSending(false);
                            return [
                                2
                            ];
                        }
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-admin-notification', {
                                body: {
                                    event_type: 'chat',
                                    thread_id: chatThread.chat_thread_id
                                }
                            }).catch(function() {})
                        ];
                    case 2:
                        _state.sent();
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
                                account_has_unread: false,
                                admin_has_unread: true
                            }).eq('chat_thread_id', chatThread.chat_thread_id)
                        ];
                    case 3:
                        _state.sent();
                        setChatSending(false);
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // Mark chat read on mobile drawer open
    var openChatDrawer = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        setChatOpen(true);
                        if (!chatThread) return [
                            3,
                            2
                        ];
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
                                account_has_unread: false
                            }).eq('chat_thread_id', chatThread.chat_thread_id)
                        ];
                    case 1:
                        _state.sent();
                        _state.label = 2;
                    case 2:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // Chat file upload (account user)
    var handleChatFile = function(e) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var _e_target_files, file, path, _ref, uploadData, uploadErr, uploadedUrl, uploadedType;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];
                        if (!file || !chatThread || !session) return [
                            2
                        ];
                        setChatUploading(true);
                        path = "user/".concat(session.user.id, "/").concat(Date.now(), "_").concat(file.name);
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('ChatUploads').upload(path, file, {
                                contentType: file.type
                            })
                        ];
                    case 1:
                        _ref = _state.sent(), uploadData = _ref.data, uploadErr = _ref.error;
                        if (uploadErr) {
                            console.error('Upload error:', uploadErr.message);
                            setChatUploading(false);
                            return [
                                2
                            ];
                        }
                        uploadedUrl = (uploadData === null || uploadData === void 0 ? void 0 : uploadData.path) || path;
                        uploadedType = file.type;
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_messages').insert({
                                chat_thread_id: chatThread.chat_thread_id,
                                actor: 'ACCOUNT',
                                actor_id: session.user.id,
                                body: null,
                                attachment_url: uploadedUrl,
                                attachment_type: uploadedType
                            })
                        ];
                    case 2:
                        _state.sent();
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-admin-notification', {
                                body: {
                                    event_type: 'chat',
                                    thread_id: chatThread.chat_thread_id
                                }
                            }).catch(function() {})
                        ];
                    case 3:
                        _state.sent();
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('chat_threads').update({
                                account_has_unread: false,
                                admin_has_unread: true
                            }).eq('chat_thread_id', chatThread.chat_thread_id)
                        ];
                    case 4:
                        _state.sent();
                        setChatUploading(false);
                        if (chatFileRef.current) chatFileRef.current.value = '';
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // Open WO detail
    var openWODetail = function(wo) {
        setSelectedWO(wo);
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: '#1a1919',
            minHeight: '100vh'
        }
    }, void 0, false, {
        fileName: "[project]/pages/account.tsx",
        lineNumber: 327,
        columnNumber: 23
    }, this);
    var NAV = [
        {
            id: 'home',
            label: 'Home'
        },
        {
            id: 'workorders',
            label: 'Work Orders'
        },
        {
            id: 'inquiries',
            label: 'Inquiries'
        },
        {
            id: 'invoices',
            label: 'Invoices'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: accountCss
                }
            }, void 0, false, {
                fileName: "[project]/pages/account.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "acc-shell",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "acc-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "acc-nav",
                                children: [
                                    NAV.map(function(n) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "acc-nav-item ".concat(activeTab === n.id ? 'on' : ''),
                                            onClick: function() {
                                                return setActiveTab(n.id);
                                            },
                                            children: n.label
                                        }, n.id, false, {
                                            fileName: "[project]/pages/account.tsx",
                                            lineNumber: 346,
                                            columnNumber: 15
                                        }, _this);
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/shop",
                                        className: "acc-nav-item",
                                        style: {
                                            textDecoration: 'none',
                                            marginTop: 'auto'
                                        },
                                        children: "Browse Shop"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/portfolio",
                                        className: "acc-nav-item",
                                        style: {
                                            textDecoration: 'none'
                                        },
                                        children: "See Portfolio"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 353,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "acc-nav-item",
                                        style: {
                                            color: 'var(--er, #b54040)'
                                        },
                                        onClick: function() {
                                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
                                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                                                    switch(_state.label){
                                                        case 0:
                                                            return [
                                                                4,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut()
                                                            ];
                                                        case 1:
                                                            _state.sent();
                                                            router.push('/');
                                                            return [
                                                                2
                                                            ];
                                                    }
                                                });
                                            })();
                                        },
                                        children: "Sign Out"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 356,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/account.tsx",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "acc-content",
                                children: [
                                    activeTab === 'home' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$HomeTab$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        editProfile: editProfile,
                                        profile: profile,
                                        profileSaving: profileSaving,
                                        profileFlash: profileFlash,
                                        hasProfileChanges: hasProfileChanges,
                                        invoiceCount: invoiceCount,
                                        invoiceTotal: invoiceTotal,
                                        smsPrefs: smsPrefs,
                                        setEditProfile: setEditProfile,
                                        saveProfile: saveProfile,
                                        toggleSms: toggleSms
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 366,
                                        columnNumber: 15
                                    }, this),
                                    activeTab === 'workorders' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$WorkOrderList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        workOrders: workOrders,
                                        onSelect: openWODetail,
                                        onAccept: acceptWO
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, this),
                                    activeTab === 'inquiries' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$InquiryList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        inquiries: inquiries,
                                        serviceRequests: serviceRequests,
                                        inquiryTab: inquiryTab,
                                        setInquiryTab: setInquiryTab,
                                        showSRForm: showSRForm,
                                        srType: srType,
                                        srDesc: srDesc,
                                        srSubmitting: srSubmitting,
                                        srGateMsg: srGateMsg,
                                        setSrType: setSrType,
                                        setSrDesc: setSrDesc,
                                        setShowSRForm: setShowSRForm,
                                        onOpenSRForm: openSRForm,
                                        onSubmitSR: submitSR
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 387,
                                        columnNumber: 15
                                    }, this),
                                    activeTab === 'invoices' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$InvoiceList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        invoices: invoices
                                    }, void 0, false, {
                                        fileName: "[project]/pages/account.tsx",
                                        lineNumber: 406,
                                        columnNumber: 54
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/account.tsx",
                                lineNumber: 363,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/account.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$ChatPanel$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        messages: messages,
                        chatInput: chatInput,
                        chatSending: chatSending,
                        chatUploading: chatUploading,
                        chatOpen: chatOpen,
                        chatEndRef: chatEndRef,
                        chatFileRef: chatFileRef,
                        setChatInput: setChatInput,
                        setChatOpen: setChatOpen,
                        openChatDrawer: openChatDrawer,
                        sendChat: sendChat,
                        handleChatFile: handleChatFile
                    }, void 0, false, {
                        fileName: "[project]/pages/account.tsx",
                        lineNumber: 411,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/account.tsx",
                lineNumber: 340,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$account$2f$WorkOrderDetailModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                selectedWO: selectedWO,
                adminInfo: adminInfo,
                profile: profile,
                showAddressEdit: showAddressEdit,
                tempAddress: tempAddress,
                addressConfirmed: addressConfirmed,
                setSelectedWO: setSelectedWO,
                setShowAddressEdit: setShowAddressEdit,
                setTempAddress: setTempAddress,
                setAddressConfirmed: setAddressConfirmed,
                setWorkOrders: setWorkOrders,
                acceptWO: acceptWO
            }, void 0, false, {
                fileName: "[project]/pages/account.tsx",
                lineNumber: 427,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(AccountPage, "Mn3bnlkBzf/u5fcL8mqdf49N6kE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AccountPage;
var accountCss = "\n.acc-shell { display: flex; height: 100vh; background: #050505; overflow: hidden; }\n.acc-left { flex: 1; display: flex; min-height: 0; min-width: 0; }\n.acc-nav { width: 180px; flex-shrink: 0; background: #0A0A0A; border-right: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; padding: 20px 0; overflow-y: auto; }\n.acc-nav-item { display: block; width: 100%; text-align: left; padding: 10px 20px; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.20em; text-transform: uppercase; color: rgba(255,255,255,0.45); background: none; border: none; border-left: 2px solid transparent; cursor: pointer; transition: color 0.15s; }\n.acc-nav-item.on { color: #d4af37; border-left-color: #d4af37; }\n.acc-nav-item:hover:not(.on) { color: rgba(255,255,255,0.75); }\n.acc-content { flex: 1; overflow-y: auto; min-height: 0; min-width: 0; }\n.acc-right { width: 35%; min-width: 300px; max-width: 420px; border-left: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; background: #0A0A0A; }\n.acc-chat-header { padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }\n.acc-chat-messages { flex: 1; overflow-y: auto; padding: 16px 20px; }\n.acc-chat-input-bar { display: flex; gap: 8px; padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.06); }\n.acc-chat-input { flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.10); padding: 10px 12px; color: #FAFAFA; font-family: 'Comfortaa', sans-serif; font-size: 13px; outline: none; }\n.acc-chat-input:focus { border-color: rgba(214,180,70,0.55); }\n.acc-chat-send { background: #d4af37; border: none; color: #050505; padding: 10px 16px; font-size: 14px; cursor: pointer; font-weight: 700; }\n.acc-chat-send:disabled { opacity: 0.4; cursor: not-allowed; }\n.acc-label { font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.38); display: block; margin-bottom: 5px; }\n.acc-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.10); padding: 10px 12px; color: #FAFAFA; font-family: 'Comfortaa', sans-serif; font-size: 13px; outline: none; }\n.acc-input:focus { border-color: rgba(214,180,70,0.55); }\n.acc-btn-gold { background: #d4af37; color: #050505; border: none; padding: 12px 20px; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; width: 100%; }\n.acc-btn-gold:disabled { opacity: 0.4; cursor: not-allowed; }\n.acc-btn-ghost { background: none; border: 1px solid rgba(255,255,255,0.10); color: rgba(255,255,255,0.45); padding: 10px 16px; font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; }\n.acc-tab { padding: 10px 0; font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.45); background: none; border: none; border-bottom: 1px solid transparent; cursor: pointer; }\n.acc-tab.on { color: #FAFAFA; border-bottom-color: #d4af37; }\n.acc-empty { font-size: 11px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.2em; }\n.acc-chat-mobile-bar { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #d4af37; color: #050505; text-align: center; padding: 14px; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; z-index: 50; }\n.acc-chat-mobile-bar.hidden { display: none !important; }\n.acc-chat-mobile-drawer { display: none; position: fixed; inset: 0; background: #050505; z-index: 100; flex-direction: column; }\n@media (max-width: 767px) {\n  .acc-right { display: none; }\n  .acc-chat-mobile-bar { display: block; }\n  .acc-chat-mobile-drawer { display: flex; }\n  .acc-nav { width: 100%; flex-direction: row; overflow-x: auto; padding: 0; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }\n  .acc-nav-item { border-left: none; border-bottom: 2px solid transparent; white-space: nowrap; padding: 12px 16px; }\n  .acc-nav-item.on { border-bottom-color: #d4af37; }\n  .acc-left { flex-direction: column; }\n}\n";
var _c;
__turbopack_context__.k.register(_c, "AccountPage");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/account.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var PAGE_PATH = "/account";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    function() {
        return __turbopack_context__.r("[project]/pages/account.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/account\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/account.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__bc08473a._.js.map